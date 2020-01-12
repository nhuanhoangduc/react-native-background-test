const RNFS = require('react-native-fs');

import _ from 'lodash';
import store from '@mobile/store';
import { global_LOAD_UPLOADED_PHOTO } from '@mobile/store/global/actions';
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
        store.dispatch(global_LOAD_UPLOADED_PHOTO(uploadedPhoto));

        console.log(uploadedPhoto)

        // 6b33e190-5ac4-4b1a-bda5-3417632ef141
    } catch (error) {
        console.log(error);
    }
};

export default worker;
