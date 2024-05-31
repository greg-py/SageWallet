import express from "express";
import teamController from "../controllers/teamController";
import { authorizeRequestUser } from "../middleware/auth";

const router = express.Router();

router.post("/", authorizeRequestUser, teamController.createUserTeam);

export default router;
