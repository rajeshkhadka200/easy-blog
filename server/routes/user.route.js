import express from "express";
import {
  addKeys,
  auth,
  getMyBlog,
  getUser,
  logout,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/auth", auth); // handles all user login and register with JWT
router.get("/getuser", authMiddleware, getUser); // get user
router.patch("/addkey/:userId", addKeys);
router.get("/getmyblog/:userId", getMyBlog);
router.delete("/logout", logout); // get user

export default router;
