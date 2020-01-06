import ApolloClient from 'apollo-boost';
import configs from '@mobile/configs';


const client = new ApolloClient({
    uri: configs.serverUrl + '/graphql',
});


export default client;
