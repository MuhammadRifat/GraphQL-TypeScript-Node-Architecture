import { authResolvers } from "./modules/auth";
import { userResolvers } from "./modules/users";

// merge all resolvers
const resolvers = { ...userResolvers, ...authResolvers };

export default resolvers;