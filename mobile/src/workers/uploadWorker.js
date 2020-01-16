const mime = require('mime');

import _ from 'lodash';
import store from '@mobile/store';
import { global_LOAD_UPLOADED_PHOTO, global_UPLOAD_LOCAL_PHOTO } from '@mobile/store/global/actions';
import { global_photoDetailSelector } from '@mobile/store/global/selectors';
import baseApi from '@mobile/api/baseApi';


const worker = async (id, { photoId }) => {
    const state = store.getState();
    const photo = global_photoDetailSelector(state, photoId, true);

    if (!photo) {
        return;
    }

    const data = new FormData();

    if (photo.sourceType === 'video') {
        data.append('video', {
            uri: photo.imageUrl,
            type: mime.getType(photo.fileName),
            name: photo.fileName,
        });
    } else {
        data.append('photo', {
            uri: photo.imageUrl,
            type: mime.getType(photo.fileName),
            name: photo.fileName,
        });
    }

    _.forEach(photo, (value, key) => {
        data.append(key, value);
    })

    try {
        const response = photo.sourceType === 'video'
            ? await baseApi.POST('/v1/api/videos', data)
            : await baseApi.POST('/v1/api/photos', data);
        const uploadedPhoto = response.data;

        store.dispatch(global_LOAD_UPLOADED_PHOTO({
            ...uploadedPhoto,
            modificationDate: photo.modificationDate,
            sourceType: photo.sourceType,
        }));
    } catch (error) {
        throw error;
    }
    
    store.dispatch(global_UPLOAD_LOCAL_PHOTO());
};

export default worker;
