import Song from "../models/song";
import multer from "multer";
import { Readable } from "stream";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const conn = mongoose.createConnection(
  `mongodb+srv://${dbuser}:${dbpass}@rahulsai-nmjia.mongodb.net/test?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

const uploadSong = (req, res) => {
  const upload = multer({ dest: "uploads/" });

  upload.single("track")(req, res, err => {
    if (err)
      return res
        .status(400)
        .json({ message: "Upload Request Validation Failed" });
    else if (!req.body.title) {
      return res.status(400).json({ message: "No track title" });
    }
  });

  let song = {};
  const readableTrackStream = new Readable();
  readableTrackStream.push(req.file);
  readableTrackStream.push(null);

  let bucket = new mongo.GridFSBucket(conn.db, { bucketName: "tracks" });
  let uploadStream = bucket.openUploadStream(req.body.title);
  let id = uploadStream.id;
  readableTrackStream.pipe(uploadStream);

  song._id = id;
  song.title = req.body.title;
  song.artist = req.body.artist;
  song.album = req.body.album;
  song.date = Date(req.body.date);

  uploadStream.on("error", () => {
    return res.status(500).json({ message: "Error uploading file" });
  });

  uploadStream.on("finish", () => {
    Song.create(song, (err, obj) => {
      if (err) res.status(500).json({ message: err });
      else res.json({ body: obj });
    });
  });
};

export { uploadSong };
