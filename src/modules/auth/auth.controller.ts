import { NextFunction, Request, Response } from "express";
import { IUser } from "../users/user.interface";
import { userService } from "../users/user.service";
import bcrypt from "bcrypt";


const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, role, password } = req.body;

        const user: IUser = await userService.findOneByQuery<IUser>({ email: email, role: role });

        if (!user) {
            return res.render("login", { message: "User not found!" });
        }

        const isPasswordMatched: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.render("login", { message: "Password Incorrect!" });
        }

        req.session.user = user;
        return res.redirect("/");
    } catch (error) {
        next(error);
    }
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
}

export { login, signup };