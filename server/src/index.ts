import express, { Express, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger";
import usersRoutes from "./routes/users";
import cors from "cors";
import { checkJwt } from "./middleware/checkJwt";

const endpointPrefix = "/api";

// Create express app
const app: Express = express();

// JSON middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Configure Swagger Docs middleware
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  `${endpointPrefix}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

// Configure routes
app.use(`${endpointPrefix}/users`, checkJwt, usersRoutes);

// Return not found for any unmatched routes
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

export default app;
