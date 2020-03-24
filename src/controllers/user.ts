import { Request, Response } from "express";
import { userDBInteractions } from "../database/interactions/user";
import { User, IUserModel } from "../database/models/user";
import { IUser } from "../interfaces/IUser";
import { validationResult } from "express-validator/check";
import { errorMessage } from "../util/errorFormatter";
import { bcryptPassword } from "../util/bcrypt";
import { statusCodes } from "../util/statusCodes";

const userController = {

    index: async (req: Request, res: Response) => {
        try {
            const users = await userDBInteractions.all();
            res.status(statusCodes.SUCCESS).send(users);
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
                const userId: string = req.params.userId;
                const user: IUserModel = await userDBInteractions.find(userId);
                user ? res.status(statusCodes.SUCCESS).send(user) : res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "User not found" });
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
                const foundUser: IUserModel = await userDBInteractions.findByEmail(req.body.email);
                if (foundUser) res.status(statusCodes.BAD_REQUEST).send({ status: statusCodes.BAD_REQUEST, message: "User already exists" });
                else {
                    const userData: IUser = {
                        ...req.body,
                        password: bcryptPassword.generateHash(req.body.password)
                    };
                    let newUser: IUserModel = await userDBInteractions.create(new User(userData));
                    newUser = newUser.toJSON();
                    delete newUser.password;
                    res.status(statusCodes.SUCCESS).send(newUser);
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
                const { userId } = req.params;
                const user: IUserModel = await userDBInteractions.find(userId, "+password");
                if (!user)
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "User not found" });
                else {
                    const userObject: IUser = {
                        email: user.email,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        date: user.date
                    };
                    const updatedVariables = {
                        ...req.body,
                    };
                    if (req.body.password) updatedVariables["password"] = bcryptPassword.generateHash(req.body.password);
                    const updatedUserBody: IUser = {
                        ...userObject,
                        ...updatedVariables
                    };

                    const updatedUser: IUserModel = await userDBInteractions.update(userId, updatedUserBody);
                    res.status(statusCodes.SUCCESS).send(updatedUser);
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
                const { userId } = req.params;
                const user: IUserModel = await userDBInteractions.find(userId);
                if (!user) {
                    res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "User not found" });
                } else {
                    await userDBInteractions.delete(userId);
                    res.status(statusCodes.SUCCESS).send();
                }
            } catch (error) {
                res.status(statusCodes.SERVER_ERROR).send(error);
            }
        }
    }
};

export { userController };