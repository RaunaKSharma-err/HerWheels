import express from "express";

import {
  signup,
  // checkAuth,
  login,
  // logout,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// router.post("/checkAuth", checkAuth);
// router.post("/logout", logout);

export default router;
