import { Router } from 'express';
import { getFlashSales } from '../controller/product.controller.js';

const router = Router();

router.get('/flash-sales', getFlashSales);

export default router;