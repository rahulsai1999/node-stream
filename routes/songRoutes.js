import { Router } from "express";
import { uploadSong } from "../controllers/songController";

const router = Router();

router.route("/songs").post(uploadSong);

export default router;
