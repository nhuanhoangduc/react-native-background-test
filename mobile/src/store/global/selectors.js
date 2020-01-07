import { createSelector } from 'reselect';
import _ from 'lodash';


export const global_localPhotosSelector = createSelector(
    [
        (store) => store.global.localPhotos,
    ],
    (localPhotos) => {
        return _.chain(localPhotos)
        .map((localPhoto) => localPhoto)
        .chunk(3)
        .value();
    }
);

export const global_uploadedPhotosSelector = createSelector(
    [
        (store) => store.global.uploadedPhotos,
    ],
    (uploadedPhotos) => {
        return _.chain(uploadedPhotos)
            .map((uploadedPhoto) => uploadedPhoto)
            .chunk(3)
            .value();
    }
);

export const global_photoDetailSelector = createSelector(
    [
        (store) => store.global.localPhotos,
        (store) => store.global.uploadedPhotos,
        (store, photoId) => photoId,
        (store, photoId, isLocal) => isLocal,
    ],
    (localPhotos, uploadedPhotos, photoId, isLocal) => {
        if (isLocal){
            return localPhotos[photoId];
        } else {
            return uploadedPhotos[photoId];
        }
    }
);
