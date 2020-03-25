import { IStore } from "../../interfaces/IStore";
import { Store, IStoreModel } from "../models/store";

export const storeDBInteractions = {

    create: (store: IStore): Promise<IStoreModel> => {
        return Store.create(store);
    },

    all: (): Promise<IStoreModel[]> => {
        return Store.find().exec();
    },

    find: (storeId: string): Promise<IStoreModel> => {
        return Store.findOne({ _id: storeId }).exec();
    },
    
    findByEmail: (email: string): Promise<IStoreModel> => {
        return Store.findOne({ email: email }).exec();
    },

    update: (storeId: string, newStore: IStore): Promise<IStoreModel> => {
        return Store.findByIdAndUpdate(storeId, newStore, { new: true }).exec();
    },

    delete: (storeId: string): Promise<IStoreModel> => {
        return Store.findByIdAndDelete(storeId).exec();
    },
};