import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Divider, TopNavigation, Layout, Text} from '@ui-kitten/components';
import CameraRoll from '@react-native-community/cameraroll';
import { useDispatch } from 'react-redux';

import { global_LOAD_PHOTOS } from '@mobile/store/global/actions';


const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const result = await CameraRoll.getPhotos({
                    first: 20,
                    assetType: 'Photos',
                });
                dispatch(global_LOAD_PHOTOS(result.edges));
            } catch (error) {
                
            }
        };
        loadPhotos();
    }, []);

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
