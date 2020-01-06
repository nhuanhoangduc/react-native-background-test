import React, { useEffect, useRef, useMemo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useQuery } from '@apollo/react-hooks';
import { Layout, Text } from '@ui-kitten/components';

import GET_ME from '@mobile/graphql/querys/getMe';

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
    const { loading, error, data } = useQuery(GET_ME);

    const Stack = useMemo(() => {
        if (!loading && !error && data) {
            const defaultScreen = data.me ? 'HomeScreen' : 'LoginScreen';
            return createStack(defaultScreen);
        } else {
            return () => null;
        }
    }, [loading]);

    if (loading) return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text category="h3">Loading...</Text>
        </Layout>
    );

    if (error) return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text category="h5">{error.message}</Text>
        </Layout>
    );

    return <Stack />;
};


export default Router;
