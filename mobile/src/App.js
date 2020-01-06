import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { Provider } from 'react-redux';

import Router from './Router';
import store from '@mobile/store';


const App = () => {
    return (
        <Provider store={store}>
            <ApplicationProvider mapping={mapping} theme={darkTheme}>
                <Router />
            </ApplicationProvider>
        </Provider>
    );
};


export default App;
