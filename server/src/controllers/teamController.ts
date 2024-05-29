import { Request, Response } from "express";
import { STATUS_CODES } from "../config/constants";
import teamService from "../services/teamService";

const createUserTeam = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const response = await teamService.createUserTeam(userId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .send({ error: "Failed to create user team" });
  }
};

export default {
  createUserTeam,
};
