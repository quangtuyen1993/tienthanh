import { Schema, model } from "mongoose";

interface IUser {
    id: string,
    name: string,
    username: string,
    password: string,
    email: string
}

const userSchema = new Schema<IUser>({
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: "" }
});

const userDb = model<IUser>('User', userSchema);
export type { IUser }
export default userDb
