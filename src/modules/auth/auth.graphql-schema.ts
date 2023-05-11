const authGraphqlSchema = `
input LoginInput {
    email: String
    role: String
    password: String
}

extend type Mutation {
    login(data: LoginInput): User
}
`;

export { authGraphqlSchema };