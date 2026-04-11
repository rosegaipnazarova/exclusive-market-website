import type { Request, Response } from 'express';
import { UserOption } from '../model/userOption.js';

export const getUserOptions = async (req: Request, res: Response) => {
  try {
    const options = await UserOption.findAll ({
      order: [['order', 'ASC']]
    });
    
    res.status(200).json(options);
  } catch (error: any) {
    res.status(500).json({ 
      message: "Menyuni yuklashda xatolik", 
      error: error.message 
    });
  }
};
