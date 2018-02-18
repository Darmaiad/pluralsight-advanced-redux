
// Combine reducers must return a top level reducer, meaning (state, action) => newState
export const combineReducers = (config) => (state, action) =>
    Object.keys(config).reduce((state, key) => {
        // Config is a map of reducers
        const reducer = config[key];

        const previousState = state.get(key);
        const newValue = reducer(previousState, action);

        // A reducer should never return undefined. He must at least return back the prevState
        if (!newValue) {
            throw new Error('A reducer returned undefined when reducing key: ', key);
        }

        return state.set(key, newValue);
    }, state);
