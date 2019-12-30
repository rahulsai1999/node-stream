import { Router } from "express";
import { downloadSong } from "../controllers/songController";
import { uploadSong } from "../controllers/songCont";

const router = Router();

router.route("/songs").post(uploadSong);
router.route("/songs/:trackid").get(downloadSong);

export default router;
