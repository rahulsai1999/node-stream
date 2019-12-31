import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Song from "../models/song";

dotenv.config();

const conn = mongoose.createConnection(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const url = process.env.DB_URL;

const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return {
      bucketName: "test",
      filename: file.originalname
    };
  }
});

const upload = multer({ storage: storage });

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
    bucketName: "test"
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

const uploadSong = (req, res) => {
  upload.single("track")(req, res, err => {
    if (err) res.json({ message: "Error uploading" });
    const song = new Song({ fileId: req.file.id, title: req.body.title });
    song.save();
    res.json({ message: "Uploaded file with id:" + req.file.id });
  });
};
export { downloadSong, uploadSong };
