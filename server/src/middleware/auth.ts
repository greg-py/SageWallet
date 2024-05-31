import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../config/constants";
import app from "../config/firebase";
import { DecodedIdToken } from "firebase-admin/auth";

interface UserRequest extends Request {
  user?: DecodedIdToken;
}

// Middleware for authenticating JWT provided in requests
export const authenticateToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(STATUS_CODES.FORBIDDEN);
  }

  try {
    const decodedToken = await app.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.sendStatus(STATUS_CODES.FORBIDDEN);
  }
};

// Middleware for authorizing user ID in request against user in JWT
export const authorizeRequestUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get user ID from request params
    const userIdFromReq = req.params.userId;
    if (!userIdFromReq) {
      return res.sendStatus(STATUS_CODES.BAD_REQUEST);
    }

    // Ensure ID from request matches ID in JWT
    const userIdFromJwt = req.user?.user_id;
    if (!userIdFromJwt || userIdFromReq !== userIdFromJwt) {
      return res.sendStatus(STATUS_CODES.FORBIDDEN);
    }

    next();
  } catch (error) {
    console.error("Error in request user authorization: ", error);
    res.sendStatus(STATUS_CODES.SERVER_ERROR);
  }
};
