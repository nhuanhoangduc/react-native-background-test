import { handleActions } from 'redux-actions';
import { fromJS } from 'sota-immutable';


const defaultState = {
    token: '',
    localPhotos: {}, // { _id, hash, imageUrl, cacheUrl }
    uploadedPhotos: {}, // { _id, hash, imageUrl }
    queue: null,
};


export const reducer = handleActions({
    global_RESET: (state, { payload }) => {
        return {
            ...state,
            registedDeviceToken: null,
        };
    },

    global_UPDATE_STATE: (state, { payload }) => {
        return fromJS(state)
            .mergeDeep(payload)
            .toJS();
    },

    global_UPDATE_STATE_SHALLOW: (state, { payload }) => {
        return fromJS(state)
            .merge(payload)
            .toJS();
    },
}, defaultState);


export default reducer;
