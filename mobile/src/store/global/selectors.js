import { createSelector } from 'reselect';
import _ from 'lodash';
import sort from 'fast-sort';


export const global_sortedLocalPhotosSelector = (
    [
        (store) => store,
    ],
    (store) => {
        const listPhotos = _.map(store.global.localPhotos, (localPhoto) => localPhoto);
        const sortedPhostos = sort(listPhotos).desc(photo => photo.modificationDate);

        return sortedPhostos;
    }
);

export const global_localPhotosSelector = createSelector(
    [
        global_sortedLocalPhotosSelector,
    ],
    (sortedPhostos) => {
        return _.chain(sortedPhostos)
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

export const global_uploadedHashesSelector = createSelector(
    [
        (store) => store.global.uploadedPhotos,
    ],
    (uploadedPhotos) => {
        return _.reduce(uploadedPhotos, (memo, uploadedPhoto) => {
            memo[uploadedPhoto.hash] = true;
            return memo;
        }, {});
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

export const global_unUploadedPhotoSelector = createSelector(
    [
        global_sortedLocalPhotosSelector,
        (store) => store.global.lastTimestamp,
    ],
    (sortedPhostos, lastTimestamp) => {
        let unUploadedPhoto = null;

        if (sortedPhostos.length === 0) {
            return null;
        }

        for (let i = sortedPhostos.length - 1; i >= 0; i--) {
            if (sortedPhostos[i].modificationDate >= lastTimestamp) {
                unUploadedPhoto = {...sortedPhostos[i]};
                break;
            }
        }

        return unUploadedPhoto;
    }
);
