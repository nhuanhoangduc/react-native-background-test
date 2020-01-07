import { createAction } from 'redux-actions';
import _ from 'lodash';
import queueFactory from 'react-native-queue';

import configs from '@mobile/configs';
import hashWorker from '@mobile/workers/hashWorker';
import uploadWorker from '@mobile/workers/uploadWorker';


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

        memo[photo.filename] = {
            _id: photo.filename,
            filename: photo.filename,
            imageUrl: photo.uri,
        };

        dispatch(global_ADD_JOB('hash-job', { photoId: photo.filename, }))

        return memo;
    }, {});

    dispatch(global_UPDATE_STATE({
        localPhotos: photoMapping,
    }));
};

export const global_LOAD_UPLOADED_PHOTOS = (uploadedPhotos) => (dispatch) => {
    const mappingPhotos = _.reduce(uploadedPhotos, (memo, uploadedPhoto) => {
        memo[uploadedPhoto._id] = {
            ...uploadedPhoto,
            imageUrl: configs.serverUrl + uploadedPhoto.imageUrl,
        };
        return memo;
    }, {});

    dispatch(global_UPDATE_STATE({
        uploadedPhotos: mappingPhotos,
    }));
};


export const global_INIT_QUEUE = () => async (dispatch) => {
    const queue = await queueFactory();

    queue.addWorker('hash-job', hashWorker, {
        onStart: async (id, payload) => {
            console.log('Job "hash-job" with id ' + id + ' has started processing.');  
        },
        
        // onSuccess job callback handler is fired after a job successfully completes processing.
        onSuccess: async (id, payload) => {
            console.log('Job "hash-job" with id ' + id + ' was successful.');
        },
        
        // onFailure job callback handler is fired after each time a job fails (onFailed also fires if job has reached max number of attempts).
        onFailure: async (id, payload) => {         
            console.log('Job "hash-job" with id ' + id + ' had an attempt end in failure.');
        },
        
        // onFailed job callback handler is fired if job fails enough times to reach max number of attempts.
        onFailed: async (id, payload) => {
            console.log('Job "hash-job" with id ' + id + ' has failed.');
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
        
        // onFailure job callback handler is fired after each time a job fails (onFailed also fires if job has reached max number of attempts).
        onFailure: async (id, payload) => {         
            console.log('Job "upload-job" with id ' + id + ' had an attempt end in failure.');
        },
        
        // onFailed job callback handler is fired if job fails enough times to reach max number of attempts.
        onFailed: async (id, payload) => {
            console.log('Job "upload-job" with id ' + id + ' has failed.');
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
