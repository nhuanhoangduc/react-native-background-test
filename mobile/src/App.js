import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';

import Router from './Router';


const App = () => {
    return (
        <ApplicationProvider mapping={mapping} theme={darkTheme}>
            <Router />
        </ApplicationProvider>
    );
};


export default App;
