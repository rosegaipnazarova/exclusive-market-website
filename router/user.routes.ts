import { Router } from 'express';
import { getProfile, updateProfile } from '../controller/user.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/update-me', authenticateToken, updateProfile);
export default router;