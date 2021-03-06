import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { users } from './../server/db';
import { getDefaultState } from './../server/getDefaultState';
import { initializeDB } from './../server/db/initializeDB';
import { createSocketMiddleware } from './socketMiddleware';
import { RECEIVE_MESSAGE } from './actions/index';
import { getPreloadedState } from './getPreloadedState';
import { currentUserStatusSaga } from './sagas/currentUserStatusSaga';
import { initSagas } from './initSagas';
import DevTools from './components/DevTools/DevTools';

// We get a reference to the io by accessing it fromt he window.io, since we can only get it in our index.html
const io = window.io;

// Configuration for sockets
//  -- Configuation for when something happens in the App and data goes out (basically an action creator):
const socketConfigOut = {
    UPDATE_STATUS: (data) => ({
        type: 'UPDATE_USER_STATUS',
        status: data,
    }),
};

// Create out middleware:
const socketMiddleware = createSocketMiddleware(io)(socketConfigOut);

//  -- Configuation for when something comes from the server (basically an action creator):
const socketConfigIn = {
    NEW_MESSAGE: (data) => ({
        type: RECEIVE_MESSAGE,
        message: data,
    }),
};

// New socket for listening to server events
const socket = io();

// Listen to events that come in from the server
/* eslint-disable guard-for-in */
for (const key in socketConfigIn) {
    socket.on(
        key,
        (data) => store.dispatch(socketConfigIn[key](data))
    );
}

initializeDB();

import { reducer } from './reducers';

// Represents the currently "logged in" user. Could be any one from the array 
const currentUser = users[0];

// const defaultState = getDefaultState(currentUser); // We now use the preLoadedState instead
// console.log(defaultState);

// Immutable.js maps appear in a not helpful way in the browser console
//  - right-click, store as a local variable
//  - the name it was saved is logged on the screen, e.g temp1
//  - temp1.toJS();

const sagaMiddleware = createSagaMiddleware();

// Transform logged to work with immutable.js data structures
const logger = createLogger({
    stateTransformer: (state) => state.toJS(),
});

const middlewares = [];
middlewares.push(sagaMiddleware); // On top of the Middleware list
middlewares.push(thunk);
middlewares.push(socketMiddleware);
// Run ONLY if environment is DEV:
middlewares.push(logger);
middlewares.push(reduxImmutableStateInvariant());

const enhancer = compose(
    applyMiddleware(
        ...middlewares
    ),
    DevTools.instrument()
);

const store = createStore(reducer, getPreloadedState(), enhancer);

// Tell Saga Middleware to run the sagas. You need to run sagas after the Saga Middleware is applied.
initSagas(sagaMiddleware);

export const getStore = () => store;
