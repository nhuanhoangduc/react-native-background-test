require('dotenv').config();

const express = require('express');
const graphQlServer = require('@backend/graphql');

const app = express();


graphQlServer.applyMiddleware({ app });
app.listen(3000, () => {
    const serverUrl = `http://localhost:${3000}${graphQlServer.graphqlPath}`;
    console.log(`🚀 Server ready at ${serverUrl}`)
});
