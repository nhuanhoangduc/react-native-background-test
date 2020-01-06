require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const graphQlServer = require('@server/graphql');
const authenticationMiddleware = require('@server/middlewares/authentication');
const imageApis = require('@server/apis/imageApis');

const staticFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(staticFolder)){
    fs.mkdirSync(staticFolder);
}

const app = express();

// Static folder
app.use('/files', express.static(staticFolder));

// Middlewares
app.use(authenticationMiddleware);

// Apis
app.use('/images', imageApis);

graphQlServer.applyMiddleware({ app });
app.listen(3000, () => {
    const serverUrl = `http://localhost:${3000}${graphQlServer.graphqlPath}`;
    console.log(`🚀 Server ready at ${serverUrl}`)
});
