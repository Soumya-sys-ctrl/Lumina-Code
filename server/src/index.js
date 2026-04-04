const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const setupSockets = require('./sockets');
const { aiQueue } = require('./queues/queue');

const app = express();
const server = http.createServer(app);

// CORS for React App
app.use(cors({ origin: '*' }));
app.use(express.json());

// Setup Socket.io
const io = new Server(server, {
  cors: { origin: '*' }
});
setupSockets(io);

// Simple API to accept code and add to queue
app.post('/api/analyze', async (req, res) => {
  const { code, mode = 'mock', activeTab } = req.body;
  console.log(`[API] Received /api/analyze request - Mode: ${mode}, Tab: ${activeTab}, Code Length: ${code ? code.length : 0}`);

  if (!code) {
    console.warn('[API] Bad Request: Code is required but missing.');
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const job = await aiQueue.add('analyze-code', { code, mode, activeTab });
    console.log(`[API] Successfully added Job ${job.id} to Queue 'ai-analysis'`);
    res.json({ jobId: job.id, message: 'Job added to queue' });
  } catch (error) {
    console.error('Queue error:', error);
    res.status(500).json({ error: 'Failed to queue job' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
