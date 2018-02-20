import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { users } from './../server/db';
import { getDefaultState } from './../server/getDefaultState';
import { initializeDB } from './../server/db/initializeDB';

initializeDB();

const reducer = (state) => state;

// Represents the currently "logged in" user. Could be any one from the array 
const currentUser = users[0];

const defaultState = getDefaultState(currentUser);

// Immutable.js maps appear in a not helpful way in the browser console
//  - right-click, store as a local variable
//  - the name it was saved is logged on the screen, e.g temp1
//  - temp1.toJS();
// console.log(defaultState);

const middlewares = [];
// Run ONLY if environment is DEV:
middlewares.push(logger);
middlewares.push(reduxImmutableStateInvariant());

const store = createStore(reducer, defaultState, applyMiddleware(...middlewares));

export const getStore = () => store;
