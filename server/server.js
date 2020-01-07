require('dotenv').config();

const http = require('http');
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

const httpServer = http.createServer(app);
graphQlServer.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(3000, () => {
  console.log(`🚀 Server ready at http://localhost:${3000}${graphQlServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${3000}${graphQlServer.subscriptionsPath}`)
});
