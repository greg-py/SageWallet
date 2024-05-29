import express from "express";
import teamController from "../controllers/teamController";

const router = express.Router();

router.post("/", teamController.createUserTeam);

export default router;
