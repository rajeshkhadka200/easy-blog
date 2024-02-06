import express from "express";
import {
  deleteBlog,
  getAllBlog,
  getBlogById,
  postBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/post", postBlog);
router.get("/getblogbyid/:blogid", getBlogById);
router.delete(
  "/delete/:hashnodeblogid/:mongoblogid/:hashnode_authorization",
  deleteBlog
);
router.patch("/update", updateBlog);

// development routes
router.get("/getall", getAllBlog);

export default router;
