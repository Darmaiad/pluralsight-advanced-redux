import { fromJS } from 'immutable';

// Transform preloaded state into immutable object
const preloadedState = fromJS(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__; // After the assignment we do not use it anymore

export const getPreloadedState = () => preloadedState;
