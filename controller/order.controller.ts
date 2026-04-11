import Joi from 'joi';
import { type Response } from 'express';
import { Order } from '../model/order.js';
import { Cart } from '../model/cart.js';

const orderSchema = Joi.object({
  firstName: Joi.string().required(),
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().pattern(/^\+?[0-9]{9,15}$/).required(),
  email: Joi.string().email().required(),
  totalAmount: Joi.number().positive().required(),
  paymentMethod: Joi.string().valid('Bank', 'Cash on delivery').required(),
  companyName: Joi.string().allow(''),
  apartment: Joi.string().allow(''),
  subtotal: Joi.number()
});

export const createOrder = async (req: any, res: Response) => {
  try {
    const { error } = orderSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ 
        message: "Ma'lumotlar xato kiritildi", 
        details: (error as any).details[0].message 
      });
    }

   
    const { 
      firstName, 
      companyName, 
      streetAddress, 
      apartment,  
      city, 
      phone, 
      email, 
      subtotal,   
      totalAmount, 
      paymentMethod 
    } = req.body;

    const userId = req.user.id;

    const order = await (Order as any).create({
      UserId: userId,
      firstName,
      companyName,
      streetAddress,
      apartment,
      city,
      phone,
      email,
      subtotal,
      totalAmount,
      paymentMethod,
      status: 'pending'
    });

    await (Cart as any).destroy({ 
      where: { UserId: userId } 
    });

    res.status(201).json({ 
      message: "Buyurtmangiz muvaffaqiyatli qabul qilindi!", 
      orderId: order.id 
    });

  } catch (error: any) {
    res.status(500).json({ 
      message: "Buyurtma yaratishda serverda xatolik yuz berdi", 
      error: error.message 
    });
  }
};