import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

interface InvitationAttributes {
  id: string;
  inviter_id: string;
  team_id: string;
  invitee: string;
}

interface InvitationCreationAttributes
  extends Optional<InvitationAttributes, "id"> {}

interface InvitationInstance
  extends Model<InvitationAttributes, InvitationCreationAttributes>,
    InvitationAttributes {
  created_at?: Date;
  updated_at?: Date;
}

const Invitation = db.define<InvitationInstance>(
  "Invitation",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    inviter_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    team_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    invitee: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "invitations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Invitation;
