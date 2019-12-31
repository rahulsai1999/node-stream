import { Router } from "express";
import { downloadSong, uploadSong } from "../controllers/songController";
const router = Router();

router.route("/songs").post(uploadSong);
router.route("/songs/:trackid").get(downloadSong);

export default router;