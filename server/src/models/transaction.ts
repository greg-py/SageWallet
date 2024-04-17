import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";
import { format } from "date-fns";
import { DATE_FORMAT_STRING } from "../config/constants";

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
  date: string;
  vendor: string;
  price: number;
  category: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;

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
    this.date = format(date, DATE_FORMAT_STRING);
    this.vendor = vendor.trim();
    this.price = price;
    this.category = category.trim();
    this.userId = user_id;
    this.createdAt = created_at && format(created_at, DATE_FORMAT_STRING);
    this.updatedAt = updated_at && format(updated_at, DATE_FORMAT_STRING);
  }
}

export default Transaction;
