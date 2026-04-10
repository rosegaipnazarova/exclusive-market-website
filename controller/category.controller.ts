import type { Request, Response } from 'express';
import { Category } from '../model/category.js';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll ({
      where: { isActive: true },
      order: [['order', 'ASC']]
    });
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: "Kategoriyalarni yuklashda xatolik", error: error.message });
  }
};
