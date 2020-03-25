import { IStore } from "../../interfaces/IStore";
import { Schema, Document, Model, model } from "mongoose";

export interface IStoreModel extends IStore, Document {}

const storeSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    storeType: {
        type: String
    },
    storeName: {
        type: String,
        required: true
    },
    storeURL: {
        type: String
       
    },
    status: {
        type: String
    },
    description: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    state: {
        type: String
    },
    logo: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    postalCodes: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Store: Model<IStoreModel> = model<IStoreModel>("Store", storeSchema);

export { Store };