import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js'; 

interface ContactAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export class Contact extends Model<ContactAttributes> implements ContactAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public message!: string;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db, 
    tableName: 'contacts',
  }
);