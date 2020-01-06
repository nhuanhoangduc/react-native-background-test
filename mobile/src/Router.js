import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '@mobile/screens/LoginScreen';
import HomeScreen from '@mobile/screens/HomeScreen';


const Router = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
    },
    HomeScreen: {
        screen: HomeScreen,
    },
}, {
    headerMode: 'none',
});

  
export default createAppContainer(Router);
