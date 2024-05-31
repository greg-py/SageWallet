import Team from "../models/team";
import TeamMember from "../models/teamMember";

const getTeamMemberByUserId = async (userId: string) => {
  try {
    return await TeamMember.findOne({
      where: { user_id: userId },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when fetching ");
    }
  }
};

const createTeamByUserId = async (userId: string) => {
  try {
    return await Team.create(
      {
        admin_id: userId,
      },
      { returning: true }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when creating team: " + error.message);
    }
  }
};

const addTeamMemberByUserId = async (teamId: string, userId: string) => {
  try {
    return await TeamMember.create(
      {
        team_id: teamId,
        user_id: userId,
      },
      { returning: true }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Database error when creating team member: " + error.message
      );
    }
  }
};

export default {
  getTeamMemberByUserId,
  createTeamByUserId,
  addTeamMemberByUserId,
};
