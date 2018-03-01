import React from 'react';
import { connect } from 'react-redux';

import ContactList from './ContactList';

const mapStateToProps = (state) => ({
    contacts: state.get('currentUser').get('contacts'),
    name: state.get('currentUser').get('name'),
});

const ContactListContainer = connect(mapStateToProps)(ContactList);

export default ContactListContainer;
