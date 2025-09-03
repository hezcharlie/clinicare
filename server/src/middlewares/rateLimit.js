import { ipKeyGenerator, rateLimit } from "express-rate-limit";

//general rae limit for authentication endpoint
export const rateLimiter = rateLimit({
  windowsMs: 2 * 60 * 1000, //2 minute
  max: 10, //attempts within a 2 min window
  message: "Too many requests, please try again later",
  standardHeaders: true, //return rate limit info in headers
  ipKeyGenerator: (req) => {
    //use ip address + user agent to identify unique clients
    return `${ipKeyGenerator(req.ip)}-${
      req.headers["user-agent"] || "unknown-user-agent"
    }`;
  },
  legacyHeaders: false, //disable X-ratedLimit headers
  trustProxy: true, //trust the X-Forwarded-For header
});

//rate limit for refresh token endpoint
export const refreshTokenLimiter = rateLimit({
  windowsMs: 15 * 60 * 1000, //15 minute
  max: 30, //attempts within a 30 min window
  message: "Too many requests, please try again later",
  standardHeaders: true, //return rate limit info in headers
  ipKeyGenerator: (req) => {
    return `${ipKeyGenerator(req.ip)}-${
      req.headers["user-agent"] || "unknown-user-agent"
    }`;
  },
  legacyHeaders: false, //disable X-ratedLimit headers
  trustProxy: true, //trust the X-Forwarded-For header
});
