import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PDFGenerator {
  constructor() {
    this.doc = null;
    this.currentPage = 1;
  }

  async generatePDF(content, outputPath) {
    return new Promise((resolve, reject) => {
      try {
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        this.doc = new PDFDocument({
          size: 'LETTER',
          margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
          }
        });

        const stream = fs.createWriteStream(outputPath);
        this.doc.pipe(stream);

        this.addCoverPage(content);
        this.addTableOfContents(content);
        this.addContentPages(content);

        this.doc.end();

        stream.on('finish', () => {
          resolve(outputPath);
        });

        stream.on('error', reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  addCoverPage(content) {
    this.doc
      .fontSize(32)
      .font('Helvetica-Bold')
      .text(content.title, { align: 'center' });

    this.doc.moveDown(2);

    this.doc
      .fontSize(18)
      .font('Helvetica')
      .text(content.type, { align: 'center' });

    this.doc.moveDown(1);

    this.doc
      .fontSize(14)
      .font('Helvetica-Oblique')
      .text(content.category, { align: 'center' });

    this.doc.moveDown(3);

    this.doc
      .fontSize(12)
      .font('Helvetica')
      .text(content.description, {
        align: 'center',
        width: 400
      });

    this.doc.moveDown(4);

    this.doc
      .fontSize(10)
      .text(`Generated: ${new Date(content.date).toLocaleDateString()}`, {
        align: 'center'
      });

    this.addFooter();
  }

  addTableOfContents(content) {
    this.doc.addPage();
    this.currentPage++;

    this.doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .text('Table of Contents', { align: 'center' });

    this.doc.moveDown(2);

    this.doc.fontSize(12).font('Helvetica');

    content.sections.forEach((section, index) => {
      const pageNumber = 3 + (index * 2);
      this.doc.text(`${index + 1}. ${section.title}`, {
        continued: true
      });
      this.doc.text(`........................................ ${pageNumber}`, {
        align: 'right'
      });
      this.doc.moveDown(0.5);
    });

    this.addFooter();
  }

  addContentPages(content) {
    content.sections.forEach((section, sectionIndex) => {
      for (let pageNum = 0; pageNum < section.pages; pageNum++) {
        this.doc.addPage();
        this.currentPage++;

        if (pageNum === 0) {
          this.doc
            .fontSize(20)
            .font('Helvetica-Bold')
            .text(`${sectionIndex + 1}. ${section.title}`, {
              underline: true
            });

          this.doc.moveDown(1);
        }

        this.doc.fontSize(11).font('Helvetica');

        const paragraphs = this.generateSectionContent(section.title, content.category, pageNum);
        
        paragraphs.forEach(para => {
          this.doc.text(para, { align: 'justify' });
          this.doc.moveDown(1);
        });

        if (section.title.includes('Exercise') || 
            section.title.includes('Practice') || 
            section.title.includes('Tracker') ||
            section.title.includes('Planning')) {
          this.addWorksheetElements();
        }

        this.addFooter();
      }
    });
  }

  generateSectionContent(sectionTitle, category, pageNum) {
    const paragraphs = [];
    
    const intro = `This section covers important aspects of ${sectionTitle.toLowerCase()} within the context of ${category.toLowerCase()}. Understanding these concepts will help you achieve better results and reach your goals more effectively.`;
    paragraphs.push(intro);

    const keyPoints = [
      `Key Point 1: ${sectionTitle} requires careful attention to detail and consistent practice. By following the guidelines outlined in this section, you'll be able to make significant progress.`,
      `Key Point 2: Remember that success in ${category.toLowerCase()} comes from applying what you learn. Take time to work through the exercises and examples provided.`,
      `Key Point 3: Track your progress regularly to ensure you're moving in the right direction. Use the worksheets and templates included to stay organized.`
    ];

    paragraphs.push(keyPoints[pageNum % keyPoints.length]);

    if (pageNum === 0) {
      paragraphs.push(`Important Note: As you work through this material, remember to take breaks and reflect on what you're learning. The most effective approach is to apply these concepts gradually and consistently.`);
    }

    return paragraphs;
  }

  addWorksheetElements() {
    this.doc.moveDown(1);
    
    this.doc.fontSize(10).font('Helvetica-Bold');
    this.doc.text('Exercise Space:', { underline: true });
    this.doc.moveDown(0.5);
    
    this.doc.font('Helvetica');
    for (let i = 0; i < 5; i++) {
      this.doc.text('_'.repeat(80));
      this.doc.moveDown(0.5);
    }

    this.doc.moveDown(0.5);
    this.doc.text('Notes:', { underline: true });
    this.doc.moveDown(0.3);
    
    for (let i = 0; i < 3; i++) {
      this.doc.text('_'.repeat(80));
      this.doc.moveDown(0.5);
    }
  }

  addFooter() {
    const bottomMargin = 50;
    const pageHeight = this.doc.page.height;
    
    this.doc
      .fontSize(9)
      .font('Helvetica')
      .text(
        `Page ${this.currentPage}`,
        50,
        pageHeight - bottomMargin + 10,
        { align: 'center' }
      );
  }
}

export async function generatePDF(content, outputPath) {
  const generator = new PDFGenerator();
  return await generator.generatePDF(content, outputPath);
}
