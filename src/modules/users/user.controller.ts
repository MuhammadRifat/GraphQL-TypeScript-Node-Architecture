import { NextFunction, Request, Response } from "express";
import { IUser } from "./user.interface";
import { userService } from "./user.service";


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: IUser[] = await userService.findAllByQuery<IUser>();

        return res.render('users', {
            users: users
        });
    } catch (error) {
        next(error);
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user: IUser = await userService.createOne<IUser>(req.body);

        return res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
}

export { getAllUsers, createUser };