import { createSelector } from 'reselect';
import _ from 'lodash';


export const global_localPhotosSelector = createSelector(
    [
        (store) => store.global.localPhotos,
    ],
    (localPhotos) => {
        return _.map(localPhotos, (localPhoto) => localPhoto);
    }
);

export const global_uploadedPhotosSelector = createSelector(
    [
        (store) => store.global.uploadedPhotos,
    ],
    (uploadedPhotos) => {
        return _.map(uploadedPhotos, (uploadedPhoto) => uploadedPhoto);
    }
);
