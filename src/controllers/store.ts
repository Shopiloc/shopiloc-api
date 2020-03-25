
import { Request, Response } from "express";
import { storeDBInteractions } from "../database/interactions/store";
import { Store, IStoreModel } from "../database/models/store";
import { IStore } from "../interfaces/IStore";
import { validationResult } from "express-validator/check";
import { errorMessage } from "../util/errorFormatter";
import { statusCodes } from "../util/statusCodes";
import { storeUtil } from "util/store";

const storeController = {

    index: async (req: Request, res: Response) => {
        try {
            const stores = await storeDBInteractions.all();
            res.status(statusCodes.SUCCESS).send(stores);
        } catch (err) {
            res.status(statusCodes.SERVER_ERROR).send(err);
        }
    },

    show: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const storeId: string = req.params.storeId;
                const store: IStoreModel = await storeDBInteractions.find(storeId);
                store ? res.status(statusCodes.SUCCESS).send(store) : res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Store not found" });
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    },

    create: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const foundStore: IStoreModel = await storeDBInteractions.findByEmail(req.body.email);
                if (foundStore) res.status(statusCodes.BAD_REQUEST).send({ status: statusCodes.BAD_REQUEST, message: "Store already exists" });
                else {
                    const storeData: IStore = {
                        ...req.body,
                        postalCodes: storeUtil.generatePostalCodes(req.body.country, req.body.postalCodes)
                    };
                    let newStore: IStoreModel = await storeDBInteractions.create(new Store(storeData));
                    res.status(statusCodes.SUCCESS).send(newStore);
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    },

    update: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const { storeId } = req.params;
                const store: IStoreModel = await storeDBInteractions.find(storeId);
                if (!store)
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Store not found" });
                else {
                    const updatedVariables = {
                        ...req.body,
                    };
                    const updatedStoreBody: IStore = {
                        ...store,
                        ...updatedVariables
                    };

                    const updatedStore: IStoreModel = await storeDBInteractions.update(storeId, updatedStoreBody);
                    res.status(statusCodes.SUCCESS).send(updatedStore);
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    },

    delete: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {
                const { storeId } = req.params;
                const store: IStoreModel = await storeDBInteractions.find(storeId);
                if (!store) {
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Store not found" });
                } else {
                    await storeDBInteractions.delete(storeId);
                    res.status(statusCodes.SUCCESS).send();
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    },

    searchByPostalCode: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(statusCodes.MISSING_PARAMS).json(errors.formatWith(errorMessage).array()[0]);
        } else {
            try {

            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    }
};

export { storeController };