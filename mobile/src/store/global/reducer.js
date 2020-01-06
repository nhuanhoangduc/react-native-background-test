import { handleActions } from 'redux-actions';
import { fromJS } from 'sota-immutable';


const defaultState = {
    // App version
    version: '1.0.0',

    // App state
    appState: 'active',

    // Modal state
    showModal: false,
    modalContent: null,

    // Sidebar state
    sidebarDrawerInstance: null,

    // Route history
    previousRouteName: '',

    // Header scroll animation
    headerAnimations: {},

    // Conection status
    isConnectedInternet: false,

    // Register device token
    registedDeviceToken: null,
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
