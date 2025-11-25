import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting AutoPDF Library in development mode...\n');

const server = spawn('node', ['server/index.js'], {
  stdio: 'inherit',
  shell: true
});

const client = spawn('vite', ['--host', '0.0.0.0', '--port', '5000'], {
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down...');
  server.kill();
  client.kill();
  process.exit();
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

client.on('error', (error) => {
  console.error('Client error:', error);
});
