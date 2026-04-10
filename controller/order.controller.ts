import { type Response } from 'express';
import { Order } from '../model/order.js';
import { Cart } from '../model/cart.js';

export const createOrder = async (req: any, res: Response) => {
  try {
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
      message: "Buyurtma yaratishda xatolik yuz berdi", 
      error: error.message 
    });
  }
};