import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyPDFs, generateSinglePDF } from './pdf-service.js';
import { 
  getAllPDFs, 
  getPDFsByDate, 
  getPDFsByCategory, 
  searchPDFs, 
  getStats,
  getTodayDate 
} from './utils.js';
import { categories } from './content-templates.js';
import { startScheduler, isSchedulerRunning } from './scheduler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/pdfs', express.static(path.join(__dirname, '..', 'pdfs')));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    scheduler: isSchedulerRunning() ? 'running' : 'stopped',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/categories', (req, res) => {
  res.json({ categories });
});

app.get('/api/pdfs', (req, res) => {
  try {
    const { date, category, search } = req.query;
    
    let pdfs;
    
    if (search) {
      pdfs = searchPDFs(search);
    } else if (date) {
      pdfs = getPDFsByDate(date);
    } else if (category) {
      pdfs = getPDFsByCategory(category);
    } else {
      pdfs = getAllPDFs();
    }
    
    pdfs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.json({ pdfs, count: pdfs.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pdfs/today', (req, res) => {
  try {
    const today = getTodayDate();
    const pdfs = getPDFsByDate(today);
    res.json({ pdfs, count: pdfs.length, date: today });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pdfs/:id', (req, res) => {
  try {
    const pdfs = getAllPDFs();
    const pdf = pdfs.find(p => p.id === req.params.id);
    
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }
    
    res.json(pdf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const { category } = req.body;
    
    if (category && !categories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    if (category) {
      const pdf = await generateSinglePDF(category);
      res.json({ 
        success: true, 
        message: 'PDF generated successfully',
        pdf 
      });
    } else {
      const result = await generateDailyPDFs();
      res.json({ 
        success: true, 
        message: `Generated ${result.count} PDFs`,
        ...result 
      });
    }
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/download/:date/:filename', (req, res) => {
  try {
    const { date, filename } = req.params;
    const filePath = path.join(__dirname, '..', 'pdfs', date, filename);
    
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(404).json({ error: 'File not found' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 AutoPDF Library Server running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`📁 PDFs: http://localhost:${PORT}/pdfs\n`);
  
  startScheduler();
});

export default app;
