import { Router } from "express";
import { downloadSong, uploadSong } from "../controllers/songController";
import { getSongs } from "../controllers/songTracks";
const router = Router();

router
  .route("/songs")
  .post(uploadSong)
  .get(getSongs);

router.route("/songs/:trackid").get(downloadSong);

export default router;