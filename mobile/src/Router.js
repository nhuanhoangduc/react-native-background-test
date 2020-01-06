import React, { useLayoutEffect, useState, useMemo } from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '@mobile/screens/LoginScreen';
import HomeScreen from '@mobile/screens/HomeScreen';


const createStack = (defaultScreen = 'LoginScreen') => {
    return createAppContainer(createStackNavigator({
        LoginScreen: {
            screen: LoginScreen,
        },
        HomeScreen: {
            screen: HomeScreen,
        },
    }, {
        initialRouteName: defaultScreen,
        headerMode: 'none',
    }));
};

  
const Router = () => {
    const [defaultScreen, setDefaultScreen] = useState(null);
    const Stack = useMemo(() => {
        if (!defaultScreen) {
            return () => null;
        }

        return createStack(defaultScreen);
    }, [defaultScreen]);

    useLayoutEffect(() => {
        setDefaultScreen('LoginScreen');
    }, []);

    if (!defaultScreen) {
        return null;
    }

    return <Stack />;
};


export default Router;
