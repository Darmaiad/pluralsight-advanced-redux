// io is the socket we are going to use for communication
export const createSocketMiddleware = (io) => (config) => {
    const socket = io();
    // Middleware has the pattern store => next => action
    return (store) => (next) => (action) => {
        // Look at every key of the configuration.
        // If the type of action is equal to the config's key, emit that action to the socket
        for (const key in config) {
            if (action.type === key) {
                socket.emit(config[key](action));
            }
        }

        let result = next(action);
        return result;
    };
};
