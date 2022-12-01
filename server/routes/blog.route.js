import express from "express";
import { postBlog } from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/post", postBlog);

export default router;
