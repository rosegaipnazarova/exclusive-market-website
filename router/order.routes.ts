import { Router } from 'express';
import { createOrder } from '../controller/order.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();
router.post('/place-order', authenticateToken, createOrder);

export default router;