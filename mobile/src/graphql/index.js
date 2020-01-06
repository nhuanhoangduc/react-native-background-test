import ApolloClient from 'apollo-boost';
import configs from '@mobile/configs';
import store from '@mobile/store';

const client = new ApolloClient({
    uri: configs.serverUrl + '/graphql',
    request: (operation) => {
        const token = store.getState().global.token;
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            },
        });
    }
});


export default client;
