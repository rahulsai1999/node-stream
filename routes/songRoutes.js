import { Router } from "express";
import { downloadSong, uploadSong } from "../controllers/songController";
import { getSongs } from "../controllers/songTracks";
import { cacheAllSongs } from "../middleware/caching";
const router = Router();

router
  .route("/songs")
  .post(uploadSong)
  .get(cacheAllSongs, getSongs);

router.route("/songs/:trackid").get(downloadSong);

export default router;