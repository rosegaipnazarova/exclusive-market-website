import { type Request, type Response } from 'express';
import { Product } from '../model/product.js';
import { Op } from 'sequelize';

export const getFlashSales = async (req: Request, res: Response) => {
  try {
    const now = new Date();

    const flashProducts = await Product.findAll({
      where: {
        isFlashSale: true,
        flashSalesExpiry: {
          [Op.gt]: now 
        }
      },
      order: [['flashSalesExpiry', 'ASC']] 
    });

    res.status(200).json({
      success: true,
      serverTime: now, 
      data: flashProducts
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: "Flash Sales yuklashda xatolik", 
      error: error.message 
    });
  }
};