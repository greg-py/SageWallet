import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

interface IncomeAttributes {
  id: string;
  date: Date;
  user: string;
  source: string;
  amount: number;
  user_id: string;
}

interface IncomeCreationAttributes extends Optional<IncomeAttributes, "id"> {}

interface IncomeInstance
  extends Model<IncomeAttributes, IncomeCreationAttributes>,
    IncomeAttributes {
  created_at?: Date;
  updated_at?: Date;
}

const Income = db.define<IncomeInstance>(
  "Income",
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
    user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "income",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Income;
