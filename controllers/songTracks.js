import Song from "../models/song";
import { createClient } from "redis";

const client = createClient(6379);

const getSongs = (req, res) => {
  Song.find({}, (err, result) => {
    if (err) res.json({ result: err });
    client.setex(req.path, 60, JSON.stringify(result));
    res.json({ result: result });
  });
};

export { getSongs };