import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.seceret_key, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // prevent CSRF attack cross-site request forgery attacks
  });

  return token;
};
