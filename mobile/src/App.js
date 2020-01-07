import React, { useEffect } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { PersistGate } from 'redux-persist/integration/react';
import BackgroundFetch from "react-native-background-fetch";

import Router from './Router';
import store, { persistor } from '@mobile/store';
import { global_START_QUEUE } from '@mobile/store/global/actions';
import graphqlClient from '@mobile/graphql';


const App = () => {
    useEffect(() => {
        BackgroundFetch.configure({
            minimumFetchInterval: 18,     // <-- minutes (15 is minimum allowed)
            // Android options
            stopOnTerminate: false,
            startOnBoot: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
            requiresCharging: false,      // Default
            requiresDeviceIdle: false,    // Default
            requiresBatteryNotLow: false, // Default
            requiresStorageNotLow: false  // Default
        }, () => {
            console.log("[js] Start queue");
            store.dispatch(global_START_QUEUE());

            setTimeout(() => {
                BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
            }, 25000);
        }, (error) => {
            console.log("[js] RNBackgroundFetch failed to start");
        });

        BackgroundFetch.status((status) => {
            switch(status) {
                case BackgroundFetch.STATUS_RESTRICTED:
                    console.log("BackgroundFetch restricted");
                    break;
                case BackgroundFetch.STATUS_DENIED:
                    console.log("BackgroundFetch denied");
                    break;
                case BackgroundFetch.STATUS_AVAILABLE:
                    console.log("BackgroundFetch is enabled");
                    break;
            }
        });
    }, []);

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
