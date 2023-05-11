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
    createUser: async ({ user }: { user: IUser }) => {
        try {
            const existingUser = await userService.findOneByQuery({ email: user.email });
            if (existingUser) {
                throw Error("User already exist!");
            }

            const saltRounds: number = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;

            const newUser: IUser = await userService.createOne<IUser>(user);

            return newUser;
        } catch (error) {
            return error;
        }
    }

}


export default userResolvers;