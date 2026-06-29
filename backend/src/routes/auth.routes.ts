import express, { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', (req: AuthRequest, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
