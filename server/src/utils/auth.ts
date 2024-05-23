import { Request } from "express";

export const getUserIdFromJwt = (req: Request) => {
  return req.auth?.payload.sub;
};
