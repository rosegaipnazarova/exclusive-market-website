import { Router } from 'express';
import { addToCart, getCart, removeItem, updateCartItem } from '../controller/cart.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', authenticateToken, getCart);
router.post('/add', authenticateToken, addToCart);
router.put('/update', authenticateToken, updateCartItem);
router.delete('/:id', authenticateToken, removeItem);

export default router;