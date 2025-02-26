import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("Authorization header not found");
    return res.status(403).json({ msg: "No token provided." });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7, authHeader.length)
    : authHeader;

  if (!token) {
    console.log("Token not found in header");
    return res.status(403).json({ msg: "Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "BEBAS");
    console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return res.status(401).json({ msg: "Unauthorized or invalid token" });
  }
};
