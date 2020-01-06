const { gql } = require('apollo-server-express');


module.exports = gql`
    type User {
        _id: ID
    }

    extend type Mutation {
        addUser(user: JSON): User
    }
`;
