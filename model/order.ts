import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '../config/db.js';

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<string>;
  declare UserId: string; // 1. BU YERGA QO'SHING: foydalanuvchini bog'lash uchun
  declare firstName: string;
  declare companyName: CreationOptional<string | null>;
  declare streetAddress: string;
  declare apartment: CreationOptional<string | null>;
  declare city: string;
  declare phone: string;
  declare email: string;
  declare subtotal: number;
  declare shipping: string;
  declare totalAmount: number;
  declare paymentMethod: 'Bank' | 'Cash on delivery';
  declare status: CreationOptional<string>;
}

Order.init({
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  UserId: { // 2. BU YERGA HAM QO'SHING: bazada ustun yaratilishi uchun
    type: DataTypes.UUID, 
    allowNull: false 
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  companyName: { type: DataTypes.STRING, allowNull: true },
  streetAddress: { type: DataTypes.STRING, allowNull: false },
  apartment: { type: DataTypes.STRING, allowNull: true },
  city: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  shipping: { type: DataTypes.STRING, defaultValue: 'Free' },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  paymentMethod: { 
    type: DataTypes.ENUM('Bank', 'Cash on delivery'), 
    allowNull: false 
  },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
}, { 
  sequelize, 
  modelName: 'Order',
  tableName: 'orders' 
});