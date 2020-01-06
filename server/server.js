require('dotenv').config();

const express = require('express');
const graphQlServer = require('@server/graphql');
const authenticationMiddleware = require('@server/middlewares/authentication');

const app = express();

// Middlewares
app.use(authenticationMiddleware);

graphQlServer.applyMiddleware({ app });
app.listen(3000, () => {
    const serverUrl = `http://localhost:${3000}${graphQlServer.graphqlPath}`;
    console.log(`🚀 Server ready at ${serverUrl}`)
});
