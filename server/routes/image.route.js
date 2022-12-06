import express from "express";
const router = express.Router();
import { changeimage, uploadCover } from "../controllers/image.controller.js";

router.post("/uploadcover", uploadCover);
router.patch("/changeprofile/:user_id", changeimage);

export default router;
