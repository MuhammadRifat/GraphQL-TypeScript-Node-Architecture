const authGraphqlSchema = `
input LoginInput {
    email: String
    role: String
    password: String
}

type LoginResponse {
    user: User 
    message: String
}

extend type Mutation {
    login(data: LoginInput): LoginResponse
}
`;

export { authGraphqlSchema };