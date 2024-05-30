import express from "express";
import teamController from "../controllers/teamController";

const router = express.Router();

router.get("/", teamController.getUserTeamMember);
router.post("/", teamController.createUserTeam);

export default router;
