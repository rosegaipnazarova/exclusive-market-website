import express from 'express';
import cors from 'cors';
import { sequelize } from './config/db.js';
import authRoutes from './router/auth.routes.js';

import userRoutes from './router/user.routes.js';
import cartRoutes from './router/cart.routes.js';

import { User } from './model/user.js';
import { Order } from './model/order.js';
import { Cart } from './model/cart.js';
import { Product } from './model/product.js';


User.hasMany(Order, { foreignKey: 'UserId' });
Order.belongsTo(User, { foreignKey: 'UserId' });


User.hasMany(Cart, { foreignKey: 'UserId' });
Cart.belongsTo(User, { foreignKey: 'UserId' });

Product.hasMany(Cart, { foreignKey: 'ProductId' });
Cart.belongsTo(Product, { foreignKey: 'ProductId' });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    app.listen(5000, () => console.log("Server 5000-portda ishladi"));
  } catch (e) {
    console.log(e);
  }
};

start();