import mongoose from "mongoose"
import userDb from "./models/users";
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;
export const db = {
    userDb: userDb
}