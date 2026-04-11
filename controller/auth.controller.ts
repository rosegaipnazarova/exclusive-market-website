import Joi from 'joi';
import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'maxfiy_kalit';

const signUpSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const signUp = async (req: Request, res: Response) => {
  try {
    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ message: (error as any).error.details[0].message });

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Bu email band." });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await (User as any).create({ 
      firstName: name, 
      lastName: '', 
      email, 
      password: hashedPassword 
    }); 

    res.status(201).json({ message: "Ro'yxatdan o'tdingiz!" });
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
      token, 
      user: { id: user.id, firstName: user.firstName, email: user.email } 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};