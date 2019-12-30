import mongoose from "mongoose";
import grid from "gridfs-stream";
import fs from "fs";

const uploadSong = (req, res) => {
  var connection = mongoose.connection;
  if (connection !== "undefined") {
    console.log(connection.readyState.toString());
    var filesrc = "../node-gridfs/uploads/file.mp3";

    connection.once("open", () => {
      console.log("Connection Open");
      var gridfs = grid(connection.db, mongoose.mongo);
      if (gridfs) {
        var streamwrite = gridfs.createWriteStream({
          filename: "file.mp3"
        });
        fs.createReadStream(filesrc).pipe(streamwrite);
        streamwrite.on("close", () => {
          console.log("Write written successfully in database");
        });
      } else {
        console.log("Sorry No Grid FS Object");
      }
    });
  } else {
    console.log("Sorry not connected");
  }
  console.log("done");
};

export { uploadSong };
