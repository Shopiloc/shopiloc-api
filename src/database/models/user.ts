import { IUser } from "../../interfaces/IUser";
import { Schema, Document, Model, model } from "mongoose";

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User: Model<IUserModel> = model<IUserModel>("User", userSchema);

export { User };