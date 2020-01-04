require('dotenv').config();

const express = require('express');
const graphQlServer = require('@backend/graphql');

const app = express();


graphQlServer.applyMiddleware({ app });
app.listen(process.env.SERVER_PORT, () => {
    const serverUrl = `http://localhost:${process.env.SERVER_PORT}${graphQlServer.graphqlPath}`;
    console.log(`🚀 Server ready at ${serverUrl}`)
});
