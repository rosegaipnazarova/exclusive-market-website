import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export class User extends Model {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare address: string;
  declare password: string;
}

User.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false }, 
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: true },    
  password: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'User' });