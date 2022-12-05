import express from "express";
import {
  deleteBlog,
  deletemany,
  getAllBlog,
  getBlogById,
  postBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/post", postBlog);
router.get("/getblogbyid/:blogid", getBlogById);
router.delete("/delete/:hashnodeblogid/:mongoblogid", deleteBlog);
router.patch("/update/:hash/:mongo/:dev", updateBlog);

// development routes
router.get("/getall", getAllBlog);
router.get("/deleteall", deletemany);
export default router;
