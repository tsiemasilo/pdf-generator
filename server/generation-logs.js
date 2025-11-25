import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOGS_FILE = path.join(__dirname, '..', 'generation-logs.json');

function ensureLogsFile() {
  if (!fs.existsSync(LOGS_FILE)) {
    fs.writeFileSync(LOGS_FILE, JSON.stringify({ logs: [] }, null, 2));
  }
}

export function addGenerationLog(logEntry) {
  ensureLogsFile();
  
  const data = JSON.parse(fs.readFileSync(LOGS_FILE, 'utf8'));
  
  const log = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...logEntry
  };
  
  data.logs.unshift(log);
  
  if (data.logs.length > 100) {
    data.logs = data.logs.slice(0, 100);
  }
  
  fs.writeFileSync(LOGS_FILE, JSON.stringify(data, null, 2));
  
  return log;
}

export function getGenerationLogs(limit = 50) {
  ensureLogsFile();
  
  const data = JSON.parse(fs.readFileSync(LOGS_FILE, 'utf8'));
  
  return data.logs.slice(0, limit);
}

export function clearGenerationLogs() {
  fs.writeFileSync(LOGS_FILE, JSON.stringify({ logs: [] }, null, 2));
}
