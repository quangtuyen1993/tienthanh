import { Schema, model, Types, Model, models } from 'mongoose';
interface IUser {
    id: Types.ObjectId,
    name: string,
    username: string,
    password: string,
    email: string
}

const userSchema = new Schema<IUser, Model<IUser>>({
    name: { type: String, default: "" },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: "" }
});

const UserModel: Model<IUser> = models.users || model<IUser>('users', userSchema);

export default UserModel
