import Joi from 'joi';
import { type Request, type Response } from 'express';
import { Contact } from '../model/contact.js';

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[0-9]{9,15}$/).required(),
  message: Joi.string().min(10).required()
});

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: "Xatolik", 
        details: (error as any).details[0].message 
      });
    }

    const { name, email, phone, message } = req.body;

    await Contact.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({ 
      message: "Xabaringiz muvaffaqiyatli yuborildi!" 
    });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Xabar yuborishda xatolik", 
      error: error.message 
    });
  }
};