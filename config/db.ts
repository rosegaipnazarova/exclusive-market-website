import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,      
  'postgres',                       
  process.env.DB_PASSWORD as string,  
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  }
);