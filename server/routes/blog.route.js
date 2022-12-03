import express from "express";
import {
  deleteBlog,
  deletemany,
  getAllBlog,
  postBlog,
} from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/post", postBlog);
router.delete("/delete/:hashnodeblogid/:mongoblogid", deleteBlog);

// development routes
router.get("/getall", getAllBlog);
router.get("/deleteall", deletemany);
export default router;
