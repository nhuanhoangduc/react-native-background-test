import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Divider, TopNavigation, Layout, Text } from '@ui-kitten/components';
import CameraRoll from '@react-native-community/cameraroll';
import { useDispatch } from 'react-redux';

import Photos from './Photos';
import { global_LOAD_LOCAL_PHOTOS, global_LOAD_UPLOADED_PHOTOS } from '@mobile/store/global/actions';


const HomeScreen = () => {
    const dispatch = useDispatch();

    const loadPhotos = async (lastPhoto = '') => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        'title': 'Access Storage',
                        'message': 'Access Storage for the pictures'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use read from the storage")
                } else {
                    console.log("Storage permission denied")
                    return;
                }
            } catch (err) {
                console.warn(err)
                return;
            }
        }

        try {
            const params = {
                first: 20,
                assetType: 'Photos',
            };
            if (lastPhoto) params.after = lastPhoto;

            const result = await CameraRoll.getPhotos(params);

            dispatch(global_LOAD_LOCAL_PHOTOS(result.edges));

            if (result.page_info.has_next_page) {
                loadPhotos(result.page_info.end_cursor);
            }
        } catch (error) {
            console.log(error)
        }
    };

    // useEffect(() => {
    //     if (!loading && !error && data && data.uploadedImages) {
    //         dispatch(global_LOAD_UPLOADED_PHOTOS(data.uploadedImages));
    //         loadPhotos();
    //     }
    // }, [loading]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Home' alignment='center'/>
            <Divider/>
            
            <Layout style={{ flex: 1 }}>
                {false ? (
                    <Text>{error.message}</Text>
                ) : (
                    <Photos />
                )}
            </Layout>
        </SafeAreaView>
    );
};


export default HomeScreen;
