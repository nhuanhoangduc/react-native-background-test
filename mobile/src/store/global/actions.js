import { createAction } from 'redux-actions';
import _ from 'lodash';


export const global_RESET = createAction('global_RESET');
export const global_UPDATE_STATE = createAction('global_UPDATE_STATE');
export const global_UPDATE_STATE_SHALLOW = createAction('global_UPDATE_STATE_SHALLOW');


export const global_UPDATE_TOKEN = (token) => (dispatch) => {
    dispatch(global_UPDATE_STATE({
        token: token,
    }));
};


export const global_LOAD_PHOTOS = (nodes) => (dispatch) => {
    const photoMapping = _.reduce(nodes, (memo, { node }) => {
        const photo = node.image;

        memo[photo.filename] = {
            filename: photo.filename,
            uri: photo.uri,
        };

        return memo;
    }, {});

    dispatch(global_UPDATE_STATE({
        photos: photoMapping,
    }));
};
