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

const downloadSong = (req, res) => {
  try {
    var trackID = new mongo.ObjectID(req.params.trackid);
  } catch (err) {
    return res.status(400).json({
      message:
        "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters"
    });
  }
  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  let bucket = new mongo.GridFSBucket(conn.db, {
    bucketName: "tracks"
  });

  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on("data", chunk => {
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
};

export { uploadSong, downloadSong };
