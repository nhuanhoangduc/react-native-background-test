import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Divider, TopNavigation, Layout, Text } from '@ui-kitten/components';
import CameraRoll from '@react-native-community/cameraroll';
import { useDispatch } from 'react-redux';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import Photos from './Photos';
import { global_LOAD_LOCAL_PHOTOS, global_LOAD_UPLOADED_PHOTOS } from '@mobile/store/global/actions';

import GET_UPLOADED_IMAGES from '@mobile/graphql/querys/getUploadedImages';
import IMAGE_UPLOADED_SUB from '@mobile/graphql/subscriptions/imageUploadedSubscription';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const { loading, error, data } = useQuery(GET_UPLOADED_IMAGES);
    const { data: subData } = useSubscription(IMAGE_UPLOADED_SUB);

    const loadPhotos = async () => {
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
            const result = await CameraRoll.getPhotos({
                first: 200,
                assetType: 'Photos',
            });
            dispatch(global_LOAD_LOCAL_PHOTOS(result.edges));
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (!loading && !error && data && data.uploadedImages) {
            dispatch(global_LOAD_UPLOADED_PHOTOS(data.uploadedImages));
            loadPhotos();
        }
    }, [loading]);

    useEffect(() => {
        if (subData && subData.imageUploaded) {
            dispatch(global_LOAD_UPLOADED_PHOTOS([subData.imageUploaded]));
        }
    }, [subData]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Home' alignment='center'/>
            <Divider/>
            
            <Layout style={{ flex: 1 }}>
                {error ? (
                    <Text>{error.message}</Text>
                ) : (
                    <Photos />
                )}
            </Layout>
        </SafeAreaView>
    );
};


export default HomeScreen;
