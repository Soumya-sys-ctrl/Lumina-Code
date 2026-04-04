const { Worker } = require('bullmq');
const { connection } = require('./redis');
const { processMockAnalysis } = require('./jobs/jobHandlers');

const workerMode = process.env.AI_MODE || 'mock';

const worker = new Worker('ai-analysis', async job => {
    try {
        // Safely extract the requested mode using optional chaining
        const requestedMode = job?.data?.mode;

        console.log(`[Worker] Started processing job ${job.id} - Requested Mode: ${requestedMode || 'undefined'}`);

        if (requestedMode === 'mock' || workerMode === 'mock') {
            // Await is required inside try/catch blocks to catch internal async errors
            return await processMockAnalysis(job);
        } else {
            console.warn(`[Worker] Live mode not implemented for job ${job.id}. Triggering fallback error.`);
            throw new Error('Live mode external LLM integration not yet implemented');
        }
    } catch (error) {
        console.error(`[Worker] Error processing job ${job.id}:`, error.message);
        console.log(`[Worker] Returning fallback response for job ${job.id}`);
        
        // Return fallback dummy response if everything fails
        return {
            originalCodeLength: job?.data?.code?.length || 0,
            suggestion: "Sample review: No critical errors found\n\n[System Notice: The AI service encountered an error and generated this fallback review.]",
            metrics: { security: 100, maintainability: 100, efficiency: 100 },
            message: "Fallback review generated due to error."
        };
    }
}, { connection });

worker.on('completed', job => {
    console.log(`[Worker] Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job.id} failed: ${err.message}`);
});

console.log(`[Worker] Listening for "ai-analysis" jobs... (Base Mode: ${workerMode})`);

// --- Graceful Shutdown Handling ---
const shutdown = async (signal) => {
    console.log(`\n[Worker] Received ${signal}, shutting down gracefully...`);
    try {
        await worker.close();
        console.log('[Worker] Closed successfully');
        process.exit(0);
    } catch (err) {
        console.error('[Worker] Error during shutdown', err);
        process.exit(1);
    }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
