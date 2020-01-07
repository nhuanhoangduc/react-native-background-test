const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: true,
    introspection: true,
    context: ({ req, connection }) => {
        if (connection) {
            console.log('meo meo meo', connection.authToken)
            return connection.context;
        } else {
            const user = req.user;
            return { user: user, };
        }
    },
    subscriptions: {
        onConnect: (connectionParams, webSocket) => {
            console.log('gau gau gau', connectionParams)
          if (connectionParams.authToken) {
            return {};
          }

          return {};
    
          throw new Error('Missing auth token!');
        },
    },
});


module.exports = server;
