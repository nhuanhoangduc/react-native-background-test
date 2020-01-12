const RNFS = require('react-native-fs');

import _ from 'lodash';
import store from '@mobile/store';
import { global_LOAD_UPLOADED_PHOTO, global_UPLOAD_LOCAL_PHOTO } from '@mobile/store/global/actions';
import { global_photoDetailSelector } from '@mobile/store/global/selectors';
import baseApi from '@mobile/api/baseApi';


const worker = async (id, { photoId }) => {
    const state = store.getState();
    const photo = global_photoDetailSelector(state, photoId, true);

    const data = new FormData();

    data.append('photo', {
        uri: photo.imageUrl,
        type: 'image/jpeg',
        name: photo.filename,
    });
    _.forEach(photo, (value, key) => {
        data.append(key, value);
    })

    try {
        const response = await baseApi.POST('/v1/api/photos', data);
        const uploadedPhoto = response.data;

        store.dispatch(global_LOAD_UPLOADED_PHOTO({
            ...uploadedPhoto,
            modificationDate: photo.modificationDate,
        }));
    } catch (error) {
        console.log(error);
    }
    
    store.dispatch(global_UPLOAD_LOCAL_PHOTO());
};

export default worker;
