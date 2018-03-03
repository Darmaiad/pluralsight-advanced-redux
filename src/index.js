import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { getStore } from './getStore';
import App from './App';
import DevTools from './components/DevTools/DevTools';

const store = getStore();

render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
        <DevTools store={store} />
    </div>,
    document.getElementById('AppContainer')
);
