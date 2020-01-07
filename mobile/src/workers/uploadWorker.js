const RNFS = require('react-native-fs');

import { Platform } from 'react-native';
import store from '@mobile/store';
import { global_UPDATE_LOCAL_PHOTO, global_ADD_JOB } from '@mobile/store/global/actions';
import { global_photoDetailSelector } from '@mobile/store/global/selectors';
import baseApi from '@mobile/api/baseApi';


const worker = async (id, { photoId }) => {
    const state = store.getState();
    const photo = global_photoDetailSelector(state, photoId, true);
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
