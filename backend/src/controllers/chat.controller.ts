import { AuthRequest } from '../middleware/auth.js';
import { Response } from 'express';
import { Chat } from '../models/Chat.js';
import { User } from '../models/User.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';
import { getAIResponse } from '../services/ai.service.js';
import { v4 as uuidv4 } from 'uuid';

export const getChats = async (req: AuthRequest, res: Response) => {
  try {
    const chats = await Chat.find({ userId: req.userId })
      .select('_id title model createdAt updatedAt messages')
      .sort({ updatedAt: -1 });

    res.json({
      data: chats.map(chat => ({
        id: chat._id,
        title: chat.title,
        model: chat.model,
        messageCount: chat.messages?.length || 0,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      })),
    });
  } catch (error) {
    logger.error('Get chats error:', error);
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
};

export const createChat = async (req: AuthRequest, res: Response) => {
  try {
    const { title, model, systemPrompt, context } = req.body;

    const chat = new Chat({
      userId: req.userId,
      title: title || 'New Chat',
      model: model || 'gpt-4-turbo',
      systemPrompt,
      context: context || {},
      messages: [],
    });

    await chat.save();
    logger.info(`Chat created: ${chat._id}`);

    res.status(201).json({
      message: 'Chat created successfully',
      data: {
        id: chat._id,
        title: chat.title,
        model: chat.model,
      },
    });
  } catch (error) {
    logger.error('Create chat error:', error);
    res.status(500).json({ message: 'Failed to create chat' });
  }
};

export const getChat = async (req: AuthRequest, res: Response) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    res.json({ data: chat });
  } catch (error) {
    logger.error('Get chat error:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to fetch chat' });
  }
};

export const updateChat = async (req: AuthRequest, res: Response) => {
  try {
    const { title, systemPrompt, context } = req.body;

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, systemPrompt, context },
      { new: true }
    );

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    res.json({ message: 'Chat updated', data: chat });
  } catch (error) {
    logger.error('Update chat error:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to update chat' });
  }
};

export const deleteChat = async (req: AuthRequest, res: Response) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    logger.info(`Chat deleted: ${req.params.id}`);
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    logger.error('Delete chat error:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to delete chat' });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { content, model } = req.body;

    if (!content) {
      throw new AppError('Message content is required', 400);
    }

    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    // Add user message
    chat.messages?.push({
      role: 'user',
      content,
      model: model || chat.model,
      tokens: { input: 0, output: 0 },
    });

    // Get AI response
    const response = await getAIResponse({
      messages: chat.messages?.map(m => ({
        role: m.role,
        content: m.content,
      })) || [],
      model: model || chat.model,
      systemPrompt: chat.systemPrompt,
    });

    // Add assistant message
    chat.messages?.push({
      role: 'assistant',
      content: response.content,
      model: model || chat.model,
      tokens: response.tokens,
    });

    await chat.save();

    res.json({
      message: 'Message sent successfully',
      data: {
        userMessage: content,
        assistantMessage: response.content,
        tokens: response.tokens,
      },
    });
  } catch (error) {
    logger.error('Send message error:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to send message' });
  }
};

export const exportChat = async (req: AuthRequest, res: Response) => {
  try {
    const { format } = req.query;
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    let data: any;
    let contentType = 'application/json';
    let filename = `${chat.title}.json`;

    if (format === 'md') {
      data = chat.messages
        ?.map(
          m => `### ${m.role === 'user' ? '👤 You' : '🤖 Assistant'}\n\n${m.content}`
        )
        .join('\n\n---\n\n');
      contentType = 'text/markdown';
      filename = `${chat.title}.md`;
    } else if (format === 'txt') {
      data = chat.messages
        ?.map(m => `[${m.role.toUpperCase()}]\n${m.content}`)
        .join('\n\n');
      contentType = 'text/plain';
      filename = `${chat.title}.txt`;
    } else {
      data = JSON.stringify(chat, null, 2);
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(data);
  } catch (error) {
    logger.error('Export chat error:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to export chat' });
  }
};
