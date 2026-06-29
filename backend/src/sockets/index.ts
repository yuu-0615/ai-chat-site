import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { logger } from '../utils/logger.js';
import { Chat } from '../models/Chat.js';

let io: SocketIOServer;

export const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on('join-chat', (chatId: string) => {
      socket.join(`chat:${chatId}`);
      logger.info(`User joined chat: ${chatId}`);
    });

    socket.on('message', async (data) => {
      try {
        const { chatId, message } = data;
        io.to(`chat:${chatId}`).emit('message-received', {
          id: Date.now(),
          content: message,
          timestamp: new Date(),
        });
      } catch (error) {
        logger.error('Message error:', error);
      }
    });

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', { userId: socket.id });
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => io;
