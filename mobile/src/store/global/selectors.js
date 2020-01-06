import { createSelector } from 'reselect';


export const global_photosSelector = createSelector(
    [
        (store) => store.global.appState,
    ],
    (appState) => {
        return appState;
    }
);
