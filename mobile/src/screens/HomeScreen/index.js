import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Divider, TopNavigation, Layout, Text} from '@ui-kitten/components';


const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Home' alignment='center'/>
            <Divider/>
            <Layout style={{ flex: 1 }}>
                <Text>Home Screen</Text>
            </Layout>
        </SafeAreaView>
    );
};


export default HomeScreen;
