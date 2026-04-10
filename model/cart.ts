import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './user.js';
import { Product } from './product.js';

export class Cart extends Model {}

Cart.init({
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
}, { sequelize, modelName: 'Cart' });

// Bog'liqliklar
User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);