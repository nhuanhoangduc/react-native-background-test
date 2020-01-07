import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Divider, TopNavigation, Layout, Text } from '@ui-kitten/components';
import CameraRoll from '@react-native-community/cameraroll';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import Photos from './Photos';
import { global_LOAD_LOCAL_PHOTOS, global_LOAD_UPLOADED_PHOTOS } from '@mobile/store/global/actions';

import GET_UPLOADED_IMAGES from '@mobile/graphql/querys/getUploadedImages';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const { loading, error, data } = useQuery(GET_UPLOADED_IMAGES);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const result = await CameraRoll.getPhotos({
                    first: 20,
                    assetType: 'Photos',
                });
                dispatch(global_LOAD_LOCAL_PHOTOS(result.edges));
            } catch (error) {
                
            }
        };
        loadPhotos();
    }, []);

    useEffect(() => {
        if (!loading && !error && data && data.uploadedImages) {
            dispatch(global_LOAD_UPLOADED_PHOTOS(data.uploadedImages));
        }
    }, [loading]);

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
