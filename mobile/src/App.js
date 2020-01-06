import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { PersistGate } from 'redux-persist/integration/react';

import Router from './Router';
import store, { persistor } from '@mobile/store';
import graphqlClient from '@mobile/graphql';


const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloProvider client={graphqlClient}>
                    <ApplicationProvider mapping={mapping} theme={darkTheme}>
                        <Router />
                    </ApplicationProvider>
                </ApolloProvider>
            </PersistGate>
        </Provider>
    );
};


export default App;
