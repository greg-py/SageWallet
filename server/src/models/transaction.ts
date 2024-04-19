import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

interface TransactionAttributes {
  id: string;
  date: Date;
  vendor: string;
  price: number;
  category: string;
  user_id: string;
}

interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id"> {}

interface TransactionInstance
  extends Model<TransactionAttributes, TransactionCreationAttributes>,
    TransactionAttributes {
  created_at?: Date;
  updated_at?: Date;
}

const Transaction = db.define<TransactionInstance>(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    vendor: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export class FormattedTransaction {
  id: string;
  date: Date;
  vendor: string;
  price: number;
  category: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    date,
    vendor,
    price,
    category,
    user_id,
    created_at,
    updated_at,
  }: TransactionInstance) {
    this.id = id;
    this.date = date;
    this.vendor = vendor.trim();
    this.price = price;
    this.category = category.trim();
    this.userId = user_id;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}

interface ClientTransaction {
  id: string;
  date: string;
  vendor: string;
  price: number;
  category: string;
  userId: string;
}

export class DatabaseTransaction {
  id: string;
  date: Date;
  vendor: string;
  price: number;
  category: string;
  user_id: string;

  constructor({
    id,
    date,
    vendor,
    price,
    category,
    userId,
  }: ClientTransaction) {
    this.id = id;
    this.date = new Date(date);
    this.vendor = vendor;
    this.price = price;
    this.category = category;
    this.user_id = userId;
  }
}

export default Transaction;
