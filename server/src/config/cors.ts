// CORS middleware configuration
export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    const allowedOriginsVar = process.env.CORS_ALLOWED_ORIGINS;
    const allowedOrigins =
      (allowedOriginsVar && JSON.parse(allowedOriginsVar)) || [];
    // Check if the incoming request's origin is in the allowed origins list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
