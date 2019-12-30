import { Router } from "express";
import { uploadSong, downloadSong } from "../controllers/songController";

const router = Router();

router.route("/songs").post(uploadSong);
router.route("/songs/:trackid").get(downloadSong);

export default router;
