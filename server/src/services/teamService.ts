import invitationsRepository from "../repository/invitationsRepository";
import teamRepository from "../repository/teamRepository";

const createTeamOrReturnInvitation = async (userId: string, email: string) => {
  // Check if there are any open invitations for user
  const openInvitation = await invitationsRepository.getInvitationByUserEmail(
    email
  );

  // If invitation found, return it for user to decide to accept/decline in UI
  if (openInvitation) {
    return {
      type: "invitation",
      data: openInvitation,
    };
  }

  // Otherwise, create a new team for user and return it
  const createTeamResponse = await createUserTeam(userId);
  if (createTeamResponse) {
    return {
      type: "teamCreation",
      data: createTeamResponse,
    };
  }

  return {
    type: "error",
    data: {},
  };
};

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
  createTeamOrReturnInvitation,
  getUserTeamMember,
  createUserTeam,
};
