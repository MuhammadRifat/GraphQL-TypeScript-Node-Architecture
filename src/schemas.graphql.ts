import { buildSchema } from 'graphql';
import { userGraphqlSchema } from "./modules/users";
import { authGraphqlSchema } from './modules/auth';

const mainGraphqlSchema = `
type Query {
    list: [User]
}

type Mutation {
    create(user: UserInput): User
}
`;

const schemas = buildSchema(`
    ${mainGraphqlSchema}
    ${userGraphqlSchema} 
    ${authGraphqlSchema}
`);

export default schemas;

