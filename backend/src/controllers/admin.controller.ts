import { AuthRequest } from '../middleware/auth.js';
import { Response } from 'express';
import { User } from '../models/User.js';
import { Chat } from '../models/Chat.js';
import { TrainingData } from '../models/TrainingData.js';
import { PromptTemplate } from '../models/PromptTemplate.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({ data: users });
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) throw new AppError('User not found', 404);
    res.json({ message: 'User role updated', data: user });
  } catch (error) {
    logger.error('Update user role error:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    logger.info(`User deleted: ${req.params.id}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

export const getAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalChats = await Chat.countDocuments();
    const totalMessages = await Chat.aggregate([
      { $group: { _id: null, count: { $sum: { $size: '$messages' } } } },
    ]);

    res.json({
      data: {
        totalUsers,
        totalChats,
        totalMessages: totalMessages[0]?.count || 0,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    logger.error('Get analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};

export const getDailyAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const dailyData = await Chat.aggregate([
      {
        $match: { createdAt: { $gte: sevenDaysAgo } },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          chatCount: { $sum: 1 },
          messageCount: { $sum: { $size: '$messages' } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ data: dailyData });
  } catch (error) {
    logger.error('Get daily analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch daily analytics' });
  }
};

export const getTrainingData = async (req: AuthRequest, res: Response) => {
  try {
    const data = await TrainingData.find({ adminId: req.userId });
    res.json({ data });
  } catch (error) {
    logger.error('Get training data error:', error);
    res.status(500).json({ message: 'Failed to fetch training data' });
  }
};

export const uploadTrainingData = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, dataType } = req.body;

    const trainingData = new TrainingData({
      adminId: req.userId,
      name,
      description,
      dataType: dataType || 'dataset',
      status: 'pending',
    });

    await trainingData.save();
    logger.info(`Training data uploaded: ${trainingData._id}`);

    res.status(201).json({
      message: 'Training data uploaded',
      data: trainingData,
    });
  } catch (error) {
    logger.error('Upload training data error:', error);
    res.status(500).json({ message: 'Failed to upload training data' });
  }
};

export const getTrainingDataById = async (req: AuthRequest, res: Response) => {
  try {
    const data = await TrainingData.findOne({
      _id: req.params.id,
      adminId: req.userId,
    });

    if (!data) throw new AppError('Training data not found', 404);
    res.json({ data });
  } catch (error) {
    logger.error('Get training data by id error:', error);
    res.status(500).json({ message: 'Failed to fetch training data' });
  }
};

export const deleteTrainingData = async (req: AuthRequest, res: Response) => {
  try {
    await TrainingData.findOneAndDelete({
      _id: req.params.id,
      adminId: req.userId,
    });
    res.json({ message: 'Training data deleted' });
  } catch (error) {
    logger.error('Delete training data error:', error);
    res.status(500).json({ message: 'Failed to delete training data' });
  }
};

export const getPromptTemplates = async (req: AuthRequest, res: Response) => {
  try {
    const templates = await PromptTemplate.find();
    res.json({ data: templates });
  } catch (error) {
    logger.error('Get prompt templates error:', error);
    res.status(500).json({ message: 'Failed to fetch prompt templates' });
  }
};

export const createPromptTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, content, category, variables, tags } = req.body;

    const template = new PromptTemplate({
      name,
      description,
      content,
      category,
      variables: variables || [],
      tags: tags || [],
      author: req.userId,
    });

    await template.save();
    res.status(201).json({ message: 'Template created', data: template });
  } catch (error) {
    logger.error('Create prompt template error:', error);
    res.status(500).json({ message: 'Failed to create template' });
  }
};

export const updatePromptTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const template = await PromptTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!template) throw new AppError('Template not found', 404);
    res.json({ message: 'Template updated', data: template });
  } catch (error) {
    logger.error('Update prompt template error:', error);
    res.status(500).json({ message: 'Failed to update template' });
  }
};

export const deletePromptTemplate = async (req: AuthRequest, res: Response) => {
  try {
    await PromptTemplate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template deleted' });
  } catch (error) {
    logger.error('Delete prompt template error:', error);
    res.status(500).json({ message: 'Failed to delete template' });
  }
};

export const getSettings = async (req: AuthRequest, res: Response) => {
  try {
    const settings = {
      rateLimiting: {
        enabled: true,
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15'),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
      },
      models: ['gpt-4-turbo', 'gpt-3.5-turbo', 'claude-3-opus'],
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'),
    };

    res.json({ data: settings });
  } catch (error) {
    logger.error('Get settings error:', error);
    res.status(500).json({ message: 'Failed to fetch settings' });
  }
};

export const updateSettings = async (req: AuthRequest, res: Response) => {
  try {
    // In a real app, you'd update these in a settings collection
    logger.info('Settings updated by admin');
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    logger.error('Update settings error:', error);
    res.status(500).json({ message: 'Failed to update settings' });
  }
};
