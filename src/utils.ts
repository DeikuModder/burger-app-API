import mongoose from "mongoose";
import dotenv from "dotenv";

function connectDB() {
  dotenv.config();

  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@burguer-app.nj6tkpl.mongodb.net/?retryWrites=true&w=majority`;

  async function connect() {
    try {
      await mongoose.connect(uri, {
        dbName: "burguers",
      });
      console.log("Connected to Database!");
    } catch (error) {
      console.error(error);
    }
  }

  connect();
}

export default connectDB;