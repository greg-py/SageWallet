import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

interface TeamAttributes {
  id: string;
  admin_id: string;
}

interface TeamCreationAttributes extends Optional<TeamAttributes, "id"> {}

interface TeamInstance
  extends Model<TeamAttributes, TeamCreationAttributes>,
    TeamAttributes {
  created_at?: Date;
  updated_at?: Date;
}

const Team = db.define<TeamInstance>(
  "Team",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    admin_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "teams",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Team;
