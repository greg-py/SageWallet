import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

interface BudgetAttributes {
  id: string;
  category: string;
  budget: number;
  user_id: string;
}

interface BudgetCreationAttributes extends Optional<BudgetAttributes, "id"> {}

interface BudgetInstance
  extends Model<BudgetAttributes, BudgetCreationAttributes>,
    BudgetAttributes {
  created_at?: Date;
  updated_at?: Date;
}

const Budget = db.define<BudgetInstance>(
  "Budget",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    budget: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "budgets",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Budget;
