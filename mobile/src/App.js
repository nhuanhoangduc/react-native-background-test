import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';

import Router from './Router';
import store from '@mobile/store';
import graphqlClient from '@mobile/graphql';


const App = () => {
    return (
        <Provider store={store}>
            <ApolloProvider client={graphqlClient}>
                <ApplicationProvider mapping={mapping} theme={darkTheme}>
                    <Router />
                </ApplicationProvider>
            </ApolloProvider>
        </Provider>
    );
};


export default App;
