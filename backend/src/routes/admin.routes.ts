import express from 'express';
import { isAdmin } from '../middleware/auth.js';
import * as adminController from '../controllers/admin.controller.js';

const router = express.Router();

// Apply admin check to all routes
router.use(isAdmin);

// User Management
router.get('/users', adminController.getUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);

// Analytics
router.get('/analytics', adminController.getAnalytics);
router.get('/analytics/daily', adminController.getDailyAnalytics);

// Training Data
router.get('/training', adminController.getTrainingData);
router.post('/training', adminController.uploadTrainingData);
router.get('/training/:id', adminController.getTrainingDataById);
router.delete('/training/:id', adminController.deleteTrainingData);

// Prompt Templates
router.get('/prompts', adminController.getPromptTemplates);
router.post('/prompts', adminController.createPromptTemplate);
router.put('/prompts/:id', adminController.updatePromptTemplate);
router.delete('/prompts/:id', adminController.deletePromptTemplate);

// Settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

export default router;
