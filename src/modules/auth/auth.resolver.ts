import { NextFunction, Request, Response } from "express";
import { IUser } from "../users/user.interface";
import { userService } from "../users/user.service";
import bcrypt from "bcrypt";


const authResolvers = {
    login: async ({ data: { email, role, password } }: { data: IUser }) => {
        try {
            const user: IUser = await userService.findOneByQuery<IUser>({ email: email, role: role });

            if (!user) {
                throw Error("User not found!");
            }

            const isPasswordMatched: boolean = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw Error("Password incorrect!");
            }

            return { user, message: "login successful!" };
        } catch (error) {
            return error;
        }
    },
}


export default authResolvers;