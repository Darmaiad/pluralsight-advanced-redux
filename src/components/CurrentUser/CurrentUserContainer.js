import React from 'react';
import { connect } from 'react-redux';

import CurrentUser from './CurrentUser';
import { updateStatus } from './../../actions';

const mapStateToProps = (state) => {
    // Preferably pass immutable objects 
    const currentUser = state.get('currentUser');
    return {
        name: currentUser.get('name'),
        status: currentUser.get('status'),
        id: currentUser.get('id'),
    };
};

const mapdispatchToProps = (dispatch) => ({
    // Destructuring event.target.value
    updateStatus: ({ target: { value } }) => dispatch(updateStatus(value)),
});

const CurrentUserContainer = connect(
    mapStateToProps,
    mapdispatchToProps
)(CurrentUser);

export default CurrentUserContainer;
