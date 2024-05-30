// Authorization middleware. When used, the Access Token must

import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { getUserIdFromJwt } from "../utils/auth";
import { STATUS_CODES } from "../config/constants";

// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
  audience: process.env.AUTH0_API_IDENTIFIER,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
});

// Check the API key included in requests from auth0
export const checkSecretKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.API_SECRET_KEY || "";

  if (!secret) {
    return res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Server error when validating secret key" });
  }

  try {
    const token = req.get("Authorization");
    if (!token) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Authorization header not found" });
    }

    const requestKey = token.replace("Bearer ", "");
    if (requestKey !== secret) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Secret key mismatch" });
    }

    next();
  } catch (error) {
    console.error("Error in secret key validation: ", error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// Check the user ID in the JWT against the user ID in the request
export const checkUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check request params for user ID to access
    const userIdFromReq = req.params.userId;
    if (!userIdFromReq) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "User ID not found in request" });
    }

    // Ensure user ID to access matches user ID in JWT
    const userIdFromJwt = getUserIdFromJwt(req);
    if (userIdFromReq !== userIdFromJwt) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "User ID mismatch" });
    }

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in JWT user check: ", error);
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
