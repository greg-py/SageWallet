import teamRepository from "../repository/teamRepository";

const getUserTeamMember = async (userId: string) => {
  return await teamRepository.getTeamMemberByUserId(userId);
};

const createUserTeam = async (userId: string) => {
  const team = await teamRepository.createTeamByUserId(userId);

  if (team && team.id) {
    return await teamRepository.addTeamMemberByUserId(team.id, userId);
  }
  throw new Error("Invalid team data");
};

export default {
  getUserTeamMember,
  createUserTeam,
};
