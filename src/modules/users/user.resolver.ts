import mongoose from "mongoose";
import { IUser } from "./user.interface";
import { userService } from "./user.service";
import bcrypt from "bcrypt";

const userResolvers = {
    listUsers: async () => {
        try {
            const users: IUser[] = await userService.findAllByQuery<IUser>();
            return users;

        } catch (error) {
            return error;
        }
    },
    getUser: async ({ _id }: { _id: string }) => {
        try {
            const user: IUser = await userService.findOneById<IUser>(new mongoose.Types.ObjectId(_id));
            return user;

        } catch (error) {
            return error;
        }
    },
    createUser: async ({ data }: { data: IUser }) => {
        try {
            const existingUser = await userService.findOneByQuery({ email: data.email });
            if (existingUser) {
                throw Error("User already exist!");
            }

            const saltRounds: number = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(data.password, salt);
            data.password = hash;

            const newUser: IUser = await userService.createOne<IUser>(data);

            return newUser;
        } catch (error) {
            return error;
        }
    },
    updateUser: async ({ _id, data }: { _id: string, data: IUser }) => {
        try {
            const existingUser = await userService.findOneByQuery({ _id: new mongoose.Types.ObjectId(_id) });
            if (!existingUser) {
                throw Error("User not exist!");
            }

            const saltRounds: number = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(data.password, salt);
            data.password = hash;

            const newUser: IUser = await userService.updateById<IUser>(new mongoose.Types.ObjectId(_id), data);

            return newUser;
        } catch (error) {
            return error;
        }
    },
    deleteUser: async ({ _id }: { _id: string }) => {
        try {
            const user: IUser = await userService.deleteById<IUser>(new mongoose.Types.ObjectId(_id));
            return user;

        } catch (error) {
            return error;
        }
    },
}


export default userResolvers;