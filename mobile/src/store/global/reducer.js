import { handleActions } from 'redux-actions';
import { fromJS } from 'sota-immutable';
import moment from 'moment';


const defaultState = {
    token: '',
    localPhotos: {}, // { _id, name, hash, imageUrl, cacheUrl }
    uploadedPhotos: {}, // { _id, hash, imageUrl }
    lastTimestamp: moment("1990-01-01").toDate().getTime()/1000,
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
