import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '..', 'data.json');

export function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ pdfs: [] }, null, 2));
  }
}

export function readData() {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

export function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function addPDFMetadata(metadata) {
  const data = readData();
  data.pdfs.push(metadata);
  writeData(data);
}

export function getAllPDFs() {
  const data = readData();
  return data.pdfs || [];
}

export function getPDFsByDate(date) {
  const pdfs = getAllPDFs();
  return pdfs.filter(pdf => pdf.date === date);
}

export function getPDFsByCategory(category) {
  const pdfs = getAllPDFs();
  return pdfs.filter(pdf => pdf.category === category);
}

export function searchPDFs(query) {
  const pdfs = getAllPDFs();
  const lowerQuery = query.toLowerCase();
  
  return pdfs.filter(pdf => 
    pdf.title.toLowerCase().includes(lowerQuery) ||
    pdf.category.toLowerCase().includes(lowerQuery) ||
    pdf.type.toLowerCase().includes(lowerQuery) ||
    pdf.description.toLowerCase().includes(lowerQuery)
  );
}

export function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getStats() {
  const pdfs = getAllPDFs();
  const today = getTodayDate();
  const todayPDFs = getPDFsByDate(today);
  
  const categoryCounts = {};
  pdfs.forEach(pdf => {
    categoryCounts[pdf.category] = (categoryCounts[pdf.category] || 0) + 1;
  });
  
  return {
    total: pdfs.length,
    today: todayPDFs.length,
    byCategory: categoryCounts,
    latestDate: pdfs.length > 0 ? pdfs[pdfs.length - 1].date : null
  };
}
