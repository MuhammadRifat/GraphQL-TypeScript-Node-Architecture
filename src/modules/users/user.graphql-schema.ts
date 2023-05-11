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

extend type Query {
    listUsers: [User]
}

extend type Mutation {
    createUser(user: UserInput): User
}
`;

export { userGraphqlSchema };