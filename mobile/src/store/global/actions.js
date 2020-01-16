import { createAction } from 'redux-actions';
import _ from 'lodash';
import queueFactory from 'react-native-queue';

import configs from '@mobile/configs';
import hashWorker from '@mobile/workers/hashWorker';
import uploadWorker from '@mobile/workers/uploadWorker';

import { global_unUploadedPhotoSelector } from './selectors';


export const global_RESET = createAction('global_RESET');
export const global_UPDATE_STATE = createAction('global_UPDATE_STATE');
export const global_UPDATE_STATE_SHALLOW = createAction('global_UPDATE_STATE_SHALLOW');


export const global_UPDATE_TOKEN = (token) => (dispatch) => {
    dispatch(global_UPDATE_STATE({
        token: token,
    }));
};


export const global_UPDATE_LOCAL_PHOTO = (id, photo) => (dispatch) => {
    dispatch(global_UPDATE_STATE({
        localPhotos: {
            [id]: photo
        },
    }));
};

export const global_LOAD_LOCAL_PHOTOS = (nodes) => async (dispatch) => {
    await dispatch(global_INIT_QUEUE());

    const photoMapping = _.reduce(nodes, (memo, { node }) => {
        const photo = node.image;
        const location = node.location;

        memo[photo.filename] = {
            id: photo.filename,
            filename: photo.filename,
            imageUrl: photo.uri,
            
            creationDate: node.timestamp,
            modificationDate: node.timestamp,
            width: photo.width,
            height: photo.height,
            isFavorite: false,
            isHidden: false,
            localIdentifier: '',
            latitude: location.latitude,
            longitude: location.longitude,
            altitude: location.altitude,
            heading: location.heading,
            speed: location.speed,
            sourceType: node.type,
        };

        return memo;
    }, {});

    dispatch(global_UPDATE_STATE({
        localPhotos: photoMapping,
    }));
};

export const global_UPLOAD_LOCAL_PHOTO = () => async (dispatch, getState) => {
    const unUploadedPhoto = global_unUploadedPhotoSelector(getState());
    console.log('uploading ' + unUploadedPhoto.imageUrl);
    dispatch(global_ADD_JOB('upload-job', { photoId: unUploadedPhoto.id, }, { attempts: 4, }));
};

export const global_LOAD_UPLOADED_PHOTO = (uploadedPhoto) => (dispatch) => {
    dispatch(global_UPDATE_STATE({
        uploadedPhotos: {
            [uploadedPhoto.id]: {
                ...uploadedPhoto,
                thumbnailUrl: uploadedPhoto.sourceType === 'video'
                    ? `${configs.serverUrl}/v1/api/videos/${uploadedPhoto.id}/thumbnail`
                    : `${configs.serverUrl}/v1/api/photos/${uploadedPhoto.id}/thumbnail`,
                imageUrl: uploadedPhoto.sourceType === 'video'
                    ? `${configs.serverUrl}/v1/api/videos/${uploadedPhoto.id}`
                    : `${configs.serverUrl}/v1/api/photos/${uploadedPhoto.id}`,
            },
        },
        lastTimestamp: uploadedPhoto.modificationDate + 1,
    }));
};


export const global_INIT_QUEUE = () => async (dispatch, getState) => {
    const queue = await queueFactory();

    queue.addWorker('hash-job', hashWorker, {
        // concurrency: 1,

        onStart: async (id, payload) => {
            console.log('Job "hash-job" with id ' + id + ' has started processing.');  
        },
        
        // onSuccess job callback handler is fired after a job successfully completes processing.
        onSuccess: async (id, payload) => {
            console.log('Job "hash-job" with id ' + id + ' was successful.');
        },
        
        // onFailed job callback handler is fired after each time a job fails (onFailed also fires if job has reached max number of attempts).
        onFailed: async (id, payload) => {         
            console.log('Job "hash-job" with id ' + id + ' had an attempt end in failure.');
        },
        
        // onComplete job callback handler fires after job has completed processing successfully or failed entirely.
        onComplete: async (id, payload) => {
            console.log('Job "hash-job" with id ' + id + ' has completed processing.');
        }
    });

    queue.addWorker('upload-job', uploadWorker, {
        concurrency: 1,
        
        onStart: async (id, payload) => {
            console.log('Job "upload-job" with id ' + id + ' has started processing.');  
        },
        
        // onSuccess job callback handler is fired after a job successfully completes processing.
        onSuccess: async (id, payload) => {
            console.log('Job "upload-job" with id ' + id + ' was successful.');
        },
        
        // onFailed job callback handler is fired after each time a job fails (onFailed also fires if job has reached max number of attempts).
        onFailed: async (id, payload) => {         
            console.log('Job "upload-job" with id ' + id + ' had an attempt end in failed.');

            const unUploadedPhoto = global_unUploadedPhotoSelector(getState());
            dispatch(global_UPDATE_STATE({
                lastTimestamp: unUploadedPhoto.modificationDate + 1,
            }));
            dispatch(global_UPLOAD_LOCAL_PHOTO());
        },
        
        // onComplete job callback handler fires after job has completed processing successfully or failed entirely.
        onComplete: async (id, payload) => {
            console.log('Job "upload-job" with id ' + id + ' has completed processing.');
        }
    });

    await queue.start();

    dispatch(global_UPDATE_STATE({
        queue: queue,
    }));
};

export const global_START_QUEUE = () => (dispatch, getState) => {
    const queue = getState().global.queue;
    
    if (!queue) {
        return;
    }

    console.log('[js] queue started');
    queue.start();
};

export const global_ADD_JOB = (jobName, payload, config = {}) => (dispatch, getState) => {
    const queue = getState().global.queue;
    
    if (!queue) {
        return;
    }

    queue.createJob(jobName, payload, config, true);
};
