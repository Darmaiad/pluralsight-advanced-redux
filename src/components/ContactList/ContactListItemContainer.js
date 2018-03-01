import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import ContactListItem from './ContactListItem';
import { openContactChannel } from './../../actions';
import { userSelector } from './../../selectors';

const mapStateToProps = (state, { id }) => { // Destructuring of ownProps.id
    const contact = userSelector(id)(state);

    return {
        name: contact.get(`name`),
        id: contact.get(`id`),
        status: contact.get(`status`),
    };
};

const mapDispatchToProps = (dispatch) => ({
    openChannel(id) {
        dispatch(openContactChannel(id));
    },
});

const ContactListItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactListItem);

export default ContactListItemContainer;
