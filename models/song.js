import mongoose from "mongoose";
import shortid from "shortid";

const songSchema = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: String,
  date: Date,
  artist: String,
  album: String
});

const songModel = mongoose.model("song", songSchema);
export default songModel;