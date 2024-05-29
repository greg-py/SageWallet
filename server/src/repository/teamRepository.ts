import Team from "../models/team";

const createTeamByUserId = async (userId: string) => {
  try {
    return await Team.create({
      admin_id: userId,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Database error when creating team: " + error.message);
    }
  }
};

export default {
  createTeamByUserId,
};
