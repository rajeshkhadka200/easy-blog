import express from "express";
import {
  addKeys,
  auth,
  check,
  getUser,
  logout,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/auth", auth); // handles all user login and register with JWT
router.post("/check", check); // check if email exist
router.get("/getuser", authMiddleware, getUser); // get user
router.patch("/addkey/:userId", addKeys);
router.delete("/logout", logout); // get user

export default router;
