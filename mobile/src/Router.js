import React, { useMemo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

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
    const token = useSelector(store => store.global.token);

    const Stack = useMemo(() => {
        const defaultScreen = token ? 'HomeScreen' : 'LoginScreen';
        return createStack(defaultScreen);
    }, []);


    return <Stack />;
};


export default Router;
