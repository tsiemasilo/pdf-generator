import path from 'path';
import { fileURLToPath } from 'url';
import { PDFGenerator } from './pdf-generator.js';
import { AIContentGenerator } from './ai-content-generator.js';
import { categories, getRandomContent } from './content-templates.js';
import { addPDFMetadata, getTodayDate } from './utils.js';
import { addGenerationLog } from './generation-logs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aiGenerator = new AIContentGenerator();

function generateFileName(category, type, index) {
  const sanitized = category.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const typeSanitized = type.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return `${sanitized}_${typeSanitized}_${index}.pdf`;
}

async function generatePDF(pdfData, outputPath, useAI = true) {
  let aiContent = null;
  let theme = null;
  let coverImageUrl = null;
  let heroContent = null;
  let endingContent = null;
  let chartDataArray = [];

  if (useAI && process.env.OPENAI_API_KEY) {
    try {
      console.log(`🤖 Generating AI content for: ${pdfData.title}`);
      
      const [generatedContent, generatedTheme, imagePrompt, generatedHero, generatedEnding] = await Promise.all([
        aiGenerator.generatePDFContent(
          pdfData.title,
          pdfData.category,
          pdfData.type,
          pdfData.sections
        ),
        aiGenerator.generateThemeAndStyle(pdfData.title, pdfData.category),
        aiGenerator.generateImagePrompt(pdfData.title, pdfData.category, 'cover'),
        aiGenerator.generateHeroPage(pdfData.title, pdfData.category, pdfData.type),
        aiGenerator.generateEndingPage(pdfData.title, pdfData.category, pdfData.type)
      ]);

      aiContent = generatedContent;
      theme = generatedTheme;
      heroContent = generatedHero;
      endingContent = generatedEnding;
      
      if (imagePrompt) {
        console.log(`🎨 Generating cover image...`);
        coverImageUrl = await aiGenerator.generateImage(imagePrompt);
      }

      console.log(`📊 Generating chart data for ${pdfData.sections.length} sections...`);
      const chartPromises = pdfData.sections.map(section =>
        aiGenerator.generateChartData(pdfData.title, pdfData.category, section.title)
      );
      chartDataArray = await Promise.all(chartPromises);
      
      console.log(`✓ AI content, theme, and charts generated successfully`);
    } catch (error) {
      console.error('⚠️ AI generation failed, using default content:', error.message);
    }
  }

  const generator = new PDFGenerator(aiContent, theme, coverImageUrl, heroContent, endingContent, chartDataArray);
  return await generator.generatePDF(pdfData, outputPath);
}

export async function generateDailyPDFs() {
  const today = getTodayDate();
  const outputDir = path.join(__dirname, '..', 'pdfs', today);
  
  const results = {
    date: today,
    count: 0,
    pdfs: [],
    errors: []
  };

  for (let i = 0; i < Math.min(categories.length, 5); i++) {
    const category = categories[i];
    const content = getRandomContent(category);
    
    if (!content) {
      results.errors.push(`No template found for category: ${category}`);
      continue;
    }

    const fileName = generateFileName(category, content.type, i + 1);
    const outputPath = path.join(outputDir, fileName);

    const pdfData = {
      id: `${today}-${i + 1}`,
      title: content.title,
      category: category,
      type: content.type,
      description: content.description,
      date: today,
      filename: fileName,
      path: `pdfs/${today}/${fileName}`,
      sections: content.sections
    };

    try {
      console.log(`\n📝 Generating PDF ${i + 1}/5: ${pdfData.title}...`);
      const result = await generatePDF(pdfData, outputPath);
      
      const enrichedPDFData = {
        ...pdfData,
        pageCount: result.metadata.pageCount,
        wordCount: result.metadata.wordCount,
        imageCount: result.metadata.imageCount,
        sectionCount: result.metadata.sectionCount,
        tags: [category, content.type, 'professional', 'comprehensive']
      };
      addPDFMetadata(enrichedPDFData);
      results.count++;
      results.pdfs.push(enrichedPDFData);
      console.log(`✓ Generated: ${fileName} (${result.metadata.pageCount} pages, ${result.metadata.imageCount} images)`);
      
      if (i < Math.min(categories.length, 5) - 1) {
        console.log('⏳ Waiting 2 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      results.errors.push({
        category,
        error: error.message
      });
      console.error(`✗ Error generating ${fileName}:`, error.message);
    }
  }

  console.log(`\nGeneration complete: ${results.count} PDFs created`);
  if (results.errors.length > 0) {
    console.log(`Errors: ${results.errors.length}`);
  }

  addGenerationLog({
    type: 'batch',
    success: results.count > 0,
    count: results.count,
    date: today,
    errors: results.errors.length,
    categories: Math.min(categories.length, 5)
  });

  return results;
}

export async function generateSinglePDF(category) {
  const today = getTodayDate();
  const outputDir = path.join(__dirname, '..', 'pdfs', today);
  
  const content = getRandomContent(category);
  if (!content) {
    throw new Error(`No template found for category: ${category}`);
  }

  const timestamp = Date.now();
  const fileName = generateFileName(category, content.type, timestamp);
  const outputPath = path.join(outputDir, fileName);

  const pdfData = {
    id: `${today}-${timestamp}`,
    title: content.title,
    category: category,
    type: content.type,
    description: content.description,
    date: today,
    filename: fileName,
    path: `pdfs/${today}/${fileName}`,
    sections: content.sections
  };

  const result = await generatePDF(pdfData, outputPath);
  
  const enrichedPDFData = {
    ...pdfData,
    pageCount: result.metadata.pageCount,
    wordCount: result.metadata.wordCount,
    imageCount: result.metadata.imageCount,
    sectionCount: result.metadata.sectionCount,
    tags: [category, content.type, 'professional', 'comprehensive']
  };
  
  addPDFMetadata(enrichedPDFData);

  addGenerationLog({
    type: 'single',
    success: true,
    category: category,
    title: content.title,
    pageCount: result.metadata.pageCount,
    imageCount: result.metadata.imageCount
  });

  return enrichedPDFData;
}
