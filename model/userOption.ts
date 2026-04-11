import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export class UserOption extends Model {
  declare id: number;
  declare label: string;
  declare icon: string;
  declare route: string;
  declare order: number;
}

UserOption.init({
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  label: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  icon: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  route: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  order: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
  }
}, {
  sequelize,
  modelName: 'UserOption',
  tableName: 'user_options',
  timestamps: false 
});