import cron from 'node-cron';
import { generateDailyPDFs } from './pdf-service.js';

let cronJob = null;
let hasRunOnStartup = false;

export async function startScheduler() {
  if (cronJob) {
    console.log('Scheduler already running');
    return;
  }

  cronJob = cron.schedule('0 0 * * *', async () => {
    console.log('Running daily PDF generation at midnight...');
    try {
      const result = await generateDailyPDFs();
      console.log(`Generated ${result.count} PDFs successfully`);
    } catch (error) {
      console.error('Error in scheduled PDF generation:', error);
    }
  });

  console.log('Scheduler started: PDFs will be generated daily at midnight');

  if (!hasRunOnStartup && process.env.OPENAI_API_KEY) {
    hasRunOnStartup = true;
    console.log('\n🚀 Running initial PDF generation on startup...');
    try {
      const result = await generateDailyPDFs();
      console.log(`✓ Initial generation complete: ${result.count} PDFs created\n`);
    } catch (error) {
      console.error('⚠️ Error in startup PDF generation:', error);
    }
  } else if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️ OpenAI API key not found. PDFs will use default templates.');
  }
}

export function stopScheduler() {
  if (cronJob) {
    cronJob.stop();
    cronJob = null;
    console.log('Scheduler stopped');
  }
}

export function isSchedulerRunning() {
  return cronJob !== null;
}
