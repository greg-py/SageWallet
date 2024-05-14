import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

interface BalanceAttributes {
  id: string;
  user: string;
  account: string;
  amount: number;
  type: string;
  user_id: string;
}

interface BalanceCreationAttributes extends Optional<BalanceAttributes, "id"> {}

interface BalanceInstance
  extends Model<BalanceAttributes, BalanceCreationAttributes>,
    BalanceAttributes {
  created_at?: Date;
  updated_at?: Date;
}

const Balance = db.define<BalanceInstance>(
  "Balance",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "balances",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Class to map GET requests
export class FormattedBalance {
  id: string;
  user: string;
  account: string;
  amount: number;
  type: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    user,
    account,
    amount,
    type,
    user_id,
    created_at,
    updated_at,
  }: BalanceInstance) {
    this.id = id;
    this.user = user;
    this.account = account;
    this.amount = amount;
    this.type = type;
    this.userId = user_id;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}

export default Balance;
