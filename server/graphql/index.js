const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: true,
    introspection: true,
    context: ({ req, connection, payload }) => {
        if (connection) {
            try {
                const token = payload.token;
                const decoded = jwt.verify(token, 'server');
                return { user: decoded, ...connection.context, };
            } catch (error) {
                return { user: null, ...connection.context, };
            }
        } else {
            const user = req.user;
            return { user: user, };
        }
    },
});


module.exports = server;
