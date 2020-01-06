const { gql } = require('apollo-server-express');


module.exports = gql`
    type User {
        _id: ID!
        username: String
        password: String
        token: String
    }

    extend type Query {
        me: User
    }

    extend type Mutation {
        login(username: String, password: String): User
    }
`;
