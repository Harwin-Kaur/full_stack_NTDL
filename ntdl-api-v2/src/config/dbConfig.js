import mongoose from "mongoose";
// const mongoUrl = "mongodb://localhost:27017/online_ntdl";
const mongoUrl = "mongodb+srv://sandhuharwinkaur_db_user:Kfiyit07OAlIgHzd@online-class-db.3gil58a.mongodb.net/";

export const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    conn && console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
