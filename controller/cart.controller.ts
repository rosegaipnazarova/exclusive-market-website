import { type Request, type Response } from 'express';
import { Cart } from '../model/cart.js';
import { Product } from '../model/product.js';

export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const item = await Cart.create({ UserId: req.user.id, ProductId: productId, quantity });
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req: any, res: Response) => {
  try {
    const cartItems = await Cart.findAll({
      where: { UserId: req.user.id },
      include: [Product]
    });
    res.json(cartItems);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCartItem = async (req: any, res: Response) => {
  try {
    const { cartItemId, quantity } = req.body;
    await Cart.update({ quantity }, { where: { id: cartItemId, UserId: req.user.id } });
    res.json({ message: "Savat yangilandi" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeItem = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await Cart.destroy({ where: { id, UserId: req.user.id } });
    res.json({ message: "Mahsulot savatdan olib tashlandi" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};