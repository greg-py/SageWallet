import express, { Express, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger";
import usersRoutes from "./routes/users";
import teamsRoutes from "./routes/teams";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { corsOptions } from "./config/cors";
import { authenticateToken } from "./middleware/auth";

const endpointPrefix = "/api";

// Create express app
const app: Express = express();

// JSON middleware
app.use(express.json());

// CORS middleware
app.use(cors(corsOptions));

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 1 minute",
});

// Configure Swagger Docs middleware
if (process.env.NODE_ENV === "development") {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use(
    `${endpointPrefix}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
  );
}

// Configure routes
app.use(`${endpointPrefix}/users`, limiter, authenticateToken, usersRoutes);
app.use(`${endpointPrefix}/teams`, limiter, authenticateToken, teamsRoutes);

// Return not found for any unmatched routes
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

export default app;
