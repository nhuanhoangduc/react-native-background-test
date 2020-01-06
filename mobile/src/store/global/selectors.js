import { createSelector } from 'reselect';


export const global_appStateSelector = createSelector(
    [
        (store) => store.global.appState,
    ],
    (appState) => {
        return appState;
    }
);
