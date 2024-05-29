import teamRepository from "../repository/teamRepository";

const createUserTeam = async (userId: string) => {
  return await teamRepository.createTeamByUserId(userId);
};

export default {
  createUserTeam,
};
