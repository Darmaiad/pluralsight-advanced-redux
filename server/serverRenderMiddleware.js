// This is a custom express.js plugin. express also uses the word middleware to describe its plugins.

import React from 'react'; // Avoid ESlint warning 'React must be in scope when using jsx'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import template from 'lodash/template';
import fs from 'fs';

import App from './../src/App';
import { reducer } from './../src/reducers/index';

const readModuleFile = (path, callback) => {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
};

// Returns a handler for an express.js route
// You can tell by the (req, res) arguments
export const handleRender = (getState) => (req, res) => {
    // Create a store like we always do, using the state we were passed
    const store = createStore(reducer, getState());

    // Actual HTML content of our file, as a string
    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const preloadedState = store.getState().toJS();
    readModuleFile('./../public/index.html', (err, index) => {
        const templated = template(index)({
            html,
            preloadedState: JSON.stringify(preloadedState)
            .replace(/</g, '\\u003c'), // prevent unsafe DOM injection
        });
        res.send(templated);
    });
};
