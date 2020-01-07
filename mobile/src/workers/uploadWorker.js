const RNFS = require('react-native-fs');

import { Platform } from 'react-native';
import store from '@mobile/store';
import { global_photoDetailSelector, global_uploadedHashesSelector } from '@mobile/store/global/selectors';
import baseApi from '@mobile/api/baseApi';


const worker = async (id, { photoId }) => {
    const state = store.getState();
    const photo = global_photoDetailSelector(state, photoId, true);
    const uploadedHashes = global_uploadedHashesSelector(state);

    if (uploadedHashes[photo.hash]) {
        console.log('Image existed');
        return;
    }

    const data = new FormData();

    data.append('image', {
        uri: photo.imageUrl,
        type: 'image/jpeg',
        name: photo.filename,
    });
    data.append('hash', photo.hash);

    try {
        await baseApi.POST('/images', data);
    } catch (error) {

    }
};

export default worker;
