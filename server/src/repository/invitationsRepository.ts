import Invitation from "../models/invitation";

const getInvitationByUserEmail = async (email: string) => {
  try {
    return await Invitation.findOne({
      where: { invitee: email },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        "Database error when fetching invitation: " + error.message
      );
    }
  }
};

export default {
  getInvitationByUserEmail,
};
