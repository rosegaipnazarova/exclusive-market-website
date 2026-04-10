import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../model/user.js';

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id, { 
      attributes: { exclude: ['password'] } 
    });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { firstName, lastName, email, address, currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    let updatedData: any = { firstName, lastName, email, address };

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Eski parol xato!" });
      }
      updatedData.password = await bcrypt.hash(newPassword, 10);
    }

    await User.update(updatedData, { where: { id: req.user.id } });

    res.json({ message: "Profil muvaffaqiyatli yangilandi!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};