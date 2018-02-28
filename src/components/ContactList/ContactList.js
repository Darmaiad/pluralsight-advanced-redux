import React from 'react';
import PropTypes from 'prop-types';

import ContactListItemContainer from './ContactListItemContainer';

const ContactList = ({ contacts, name, openConversation }) => (
    <div>
        <div>
            <h3>{name}'s Contacts</h3>
        </div>
        <div>
            {contacts.map((contact) => (
                <ContactListItemContainer key={contact} id={contact} />
            ))}
        </div>
    </div>
);

ContactList.propTypes = {
    contacts: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    openConversation: PropTypes.func.isRequired,
};

export default ContactList;
