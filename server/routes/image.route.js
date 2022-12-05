import express from "express";
const router = express.Router();
import { uploadCover } from "../controllers/image.controller.js";

router.post("/uploadcover", uploadCover);

export default router;
