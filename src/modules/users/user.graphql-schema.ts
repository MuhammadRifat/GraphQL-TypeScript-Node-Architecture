const userGraphqlSchema = `
type User {
    _id: ID!
    name: String
    email: String
    role: String
    password: String
}

input UserInput {
    name: String
    email: String
    role: String
    password: String
}

type Query {
    listUsers: [User]
}

type Mutation {
    createUser(user: UserInput): User
}
`;

export { userGraphqlSchema };