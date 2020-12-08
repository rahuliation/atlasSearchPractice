/* This is a database connection function*/
import mongoose from "mongoose";
var debug = require("debug")("dbconnect");

const connection = {}; /* creating connection object*/

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    if (db) {
      debug("Mongodb connected");
    }
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {

    debug("Mongodb Connection error", error);

  }
}

export default dbConnect;
