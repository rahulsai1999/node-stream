import Song from "../models/song";

const getSongs = (req, res) => {
  Song.find({}, (err, result) => {
    if (err) res.json({ result: err });
    res.json({ result: result });
  });
};

export { getSongs };
