import { ALLOWED_ORIGINS } from "./constants";

// CORS middleware configuration
export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Check if the incoming request's origin is in the allowed origins list
    if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
