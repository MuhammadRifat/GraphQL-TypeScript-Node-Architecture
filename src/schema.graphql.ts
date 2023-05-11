import { buildSchema } from 'graphql';
import { userGraphqlSchema } from "./modules/users";


const schema = buildSchema(userGraphqlSchema);

export default schema;

