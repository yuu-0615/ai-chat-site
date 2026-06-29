import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode,
    });
  }

  res.status(500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
    status: 500,
  });
};
