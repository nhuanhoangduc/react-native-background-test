import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

// Reducers
import globalReducer from './global/reducer';



const storage = AsyncStorage;
const reducers = combineReducers({
    global: persistReducer({
        key: 'global5',
        storage: storage,
        whitelist: ['token', 'uploadedPhotos', 'lastTimestamp'],
    }, globalReducer),
});

const middleWares = [thunk];

if (__DEV__) {
    const { logger } = require(`redux-logger`);
    middleWares.push(logger);
}

const composeEnhancers =
    typeof window === 'object' &&
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && __DEV__) ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
        (middleWares) => middleWares;

const enhancer = composeEnhancers (
  applyMiddleware(...middleWares),
);

const store = createStore(
    reducers,
    enhancer
);


export const persistor = persistStore(store);

export const dispatch = store.dispatch;
export const getState = store.getState;

export default store;
