import app from './app.js';
import { connectDB } from './config/database.js';
import { logger } from './utils/logger.js';
import { initializeSocket } from './sockets/index.js';
import http from 'http';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

// Connect to Database
connectDB();

server.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📝 API Documentation: http://localhost:${PORT}/api/docs`);
});

process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});
