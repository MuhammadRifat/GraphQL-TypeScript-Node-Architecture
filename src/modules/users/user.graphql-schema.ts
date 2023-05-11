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
    getUser(_id: String): User
}

extend type Mutation {
    createUser(data: UserInput): User
    deleteUser(_id: ID!): User
    updateUser(_id: String, data: UserInput): User
}
`;

export { userGraphqlSchema };