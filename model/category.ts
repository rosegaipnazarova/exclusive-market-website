import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
export class Category extends Model {
  declare id: number;
  declare name: string;
  declare icon: string;    
  declare slug: string;    
  declare order: number;   
  declare isActive: boolean;
}
export class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currentPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isFlashSale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true
});
