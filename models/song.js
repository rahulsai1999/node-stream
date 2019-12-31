import mongoose, { Schema } from "mongoose";

const songSchema = mongoose.Schema({
  fileId: Schema.Types.ObjectId,
  title: String,
  date: Date,
  artist: String,
  album: String
});

const songModel = mongoose.model("song", songSchema);
export default songModel;