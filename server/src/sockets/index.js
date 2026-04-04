const { queueEvents } = require('../queues/queue');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    // Listen to BullMQ events and forward them to connected clients
    // This broadcasts to everyone; for a real app, we'd emit strictly to the room matching the client ID
    queueEvents.on('active', ({ jobId }) => {
        console.log(`[Socket] Job ${jobId} is active`);
        io.emit('job-active', { jobId });
    });

    queueEvents.on('progress', ({ jobId, data }) => {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        console.log(`[Socket] Job ${jobId} progress: ${parsedData?.progress}%`, parsedData?.step || '');
        io.emit('job-progress', { jobId, data: parsedData });
    });

    queueEvents.on('completed', ({ jobId, returnvalue }) => {
        try {
            const parsedResult = typeof returnvalue === 'string' ? JSON.parse(returnvalue) : returnvalue;
            console.log(`[Socket] Job ${jobId} completed successfully.`);
            io.emit('job-completed', { jobId, result: parsedResult });
        } catch (err) {
            console.error(`[Socket] Error parsing completed job result for ${jobId}:`, err);
            // Send empty fallback message on parse fail
            io.emit('job-completed', { jobId, result: { message: "Result parse failed", suggestion: "Analysis execution error tracking." } });
        }
    });

    queueEvents.on('failed', ({ jobId, failedReason }) => {
        console.error(`[Socket] Job ${jobId} failed:`, failedReason);
        io.emit('job-failed', { jobId, error: failedReason });
    });
};
