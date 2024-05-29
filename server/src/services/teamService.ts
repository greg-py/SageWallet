import teamRepository from "../repository/teamRepository";

const createUserTeam = async (userId: string) => {
  const team = await teamRepository.createTeamByUserId(userId);

  if (team && team.id) {
    return await teamRepository.addTeamMemberByUserId(team.id, userId);
  }
  throw new Error("Invalid team data");
};

export default {
  createUserTeam,
};
