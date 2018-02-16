import { createStore } from 'redux';
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

const store = createStore(reducer, defaultState);

export const getStore = () => store;
