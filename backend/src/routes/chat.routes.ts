import express from 'express';
import { AuthRequest } from '../middleware/auth.js';
import * as chatController from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/', chatController.getChats);
router.post('/', chatController.createChat);
router.get('/:id', chatController.getChat);
router.put('/:id', chatController.updateChat);
router.delete('/:id', chatController.deleteChat);
router.post('/:id/messages', chatController.sendMessage);
router.get('/:id/export', chatController.exportChat);

export default router;
