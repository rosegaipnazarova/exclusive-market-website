import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes} from 'sequelize';
import { sequelize } from '../config/db.js';

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare price: number;
  declare image: string;
}

Product.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
}, { sequelize, modelName: 'Product' });