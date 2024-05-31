import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

interface TeamMemberAttributes {
  id: string;
  team_id: string;
  user_id: string;
}

interface TeamMemberCreationAttributes
  extends Optional<TeamMemberAttributes, "id"> {}

interface TeamMemberInstance
  extends Model<TeamMemberAttributes, TeamMemberCreationAttributes>,
    TeamMemberAttributes {
  created_at?: Date;
  updated_at?: Date;
}

const TeamMember = db.define<TeamMemberInstance>(
  "TeamMember",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    team_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "team_members",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default TeamMember;
