import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const App = ({ state }) => (
    <div>
        <h1>
            Redux Messenger
        </h1>
        <h2>
            Welcome, {state.get(`currentUser`).get(`name`)}
        </h2>
    </div>
);

App.propTypes = {
    state: ImmutablePropTypes.map.isRequired,
};
