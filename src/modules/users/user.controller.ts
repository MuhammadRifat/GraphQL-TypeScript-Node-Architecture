import { NextFunction, Request, Response } from "express";
import { IUser } from "./user.interface";
import { userService } from "./user.service";
import bcrypt from "bcrypt";


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: IUser[] = await userService.findAllByQuery<IUser>();
        req.session.user = users[0];
        return res.render('users', {
            users: users
        });
    } catch (error) {
        next(error);
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const saltRounds: number = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const user: IUser = await userService.createOne<IUser>(req.body);

        return res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
}

export { getAllUsers, createUser };