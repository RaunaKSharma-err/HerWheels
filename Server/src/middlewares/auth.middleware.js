import jwt from "jsonwebtoken";
import prisma from "../DB/db.config.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    const decode = jwt.verify(token, process.env.seceret_key);

    if (!decode) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await prisma.user
      .findUnique(decode.userId)
      .select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware: " + error.message);
    res.status(501).json({ message: "internal server error" });
  }
};
