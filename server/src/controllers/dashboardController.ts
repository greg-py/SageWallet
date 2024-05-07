import { Request, Response } from "express";
import dashboardService from "../services/dashboardService";

const getUserDashboard = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { month, year } = req.query;

    if (!userId || !month || !year) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    if (typeof month !== "string" || typeof year !== "string") {
      return res.status(400).send({ error: "Invalid query parameters" });
    }

    const response = await dashboardService.getUserDashboard(
      userId,
      month,
      year
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch user dashboard data" });
  }
};

export default {
  getUserDashboard,
};
