const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: true,
    introspection: true,
    context: ({ req }) => {
        const user = req.user;
        return { user: user, };
    },
});


module.exports = server;
