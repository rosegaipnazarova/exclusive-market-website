import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js'; 
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'maxfiy_kalit';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email band." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword 
    } as any); 

    res.status(201).json({ 
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz", 
      userId: newUser.id 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email yoki parol xato!" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ 
      message: "Xush kelibsiz", 
      token, 
      user: { 
        id: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName 
      } 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};