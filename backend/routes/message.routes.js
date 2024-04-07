import express from 'express';
import { getMessage, sendMessage } from '../controllers/message.controllers.js';
const router=express.Router();
router.post('/send/:id',sendMessage);
router.get('/:id',getMessage);
export default router;