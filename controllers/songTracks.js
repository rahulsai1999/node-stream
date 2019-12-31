import Song from "../models/song";
import { cacheEnable } from "../middleware/caching";

const getSongs = (req, res) => {
  Song.find({}, (err, result) => {
    if (err) res.json({ result: err });
    cacheEnable(req, result);
    res.json({ result: result });
  });
};

export { getSongs };
