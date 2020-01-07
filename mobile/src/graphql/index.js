import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import configs from '@mobile/configs';
import store from '@mobile/store';


const httpLink = new HttpLink({
    uri: configs.serverUrl + '/graphql',
    fetch: (uri, options) => {
        const token = store.getState().global.token;
        options.headers.Authorization = token ? `Bearer ${token}` : '';
        return fetch(uri, options);
    },
});

const wsClient = new SubscriptionClient(configs.serverUrl + '/graphql', {
    reconnect: true,
    connectionParams: {
        name: 'nhuan'
    }
});
wsClient.use([
    {
        applyMiddleware(operationOptions, next) {
            const token = store.getState().global.token;
            operationOptions["authToken"] = token;
            next();
        }
    }
]);
console.log(wsClient)
const wsLink = new WebSocketLink(wsClient);


const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});


export default client;
