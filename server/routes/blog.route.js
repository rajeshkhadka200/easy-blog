import express from "express";
import {
  deleteBlog,
  getAllBlog,
  getBlogById,
  postBlog,
  searchBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/post", postBlog);
router.get("/getblogbyid/:blogid", getBlogById);
router.delete("/delete/:hashnodeblogid/:mongoblogid", deleteBlog);
router.patch("/update", updateBlog);
router.get("/search/:search", searchBlog);

// development routes
router.get("/getall", getAllBlog);
export default router;
