import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;

const dbConnect = () => {
  mongoose.connect(
    `mongodb+srv://${dbuser}:${dbpass}@rahulsai-nmjia.mongodb.net/test?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    err => {
      if (!err) {
        console.log("Connected to database");
      }
    }
  );
};

const connection = mongoose.createConnection(
  `mongodb+srv://${dbuser}:${dbpass}@rahulsai-nmjia.mongodb.net/test?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

export { dbConnect, connection };
