const { Queue, QueueEvents } = require('bullmq');

const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
};

const aiQueue = new Queue('ai-analysis', { connection });
const queueEvents = new QueueEvents('ai-analysis', { connection });

module.exports = {
    aiQueue,
    queueEvents,
    connection
};
