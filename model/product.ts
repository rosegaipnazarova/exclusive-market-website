import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

interface ProductAttributes {
  id?: number;
  name: string;
  price: number;              
  discountPrice?: number;     
  discountPercent?: number;   
  image: string;
  rating: number;             
  reviewCount: number;        
  isFlashSale: boolean;       
  flashSalesExpiry?: Date;    
}

export class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public discountPrice?: number;
  public discountPercent?: number;
  public image!: string;
  public rating!: number;
  public reviewCount!: number;
  public isFlashSale!: boolean;
  public flashSalesExpiry?: Date;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    discountPrice: { type: DataTypes.FLOAT },
    discountPercent: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    reviewCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    isFlashSale: { type: DataTypes.BOOLEAN, defaultValue: false },
    flashSalesExpiry: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: 'products',
  }
);