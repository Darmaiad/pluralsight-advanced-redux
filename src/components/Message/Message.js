import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ owner: { name }, text }) => (
    <div>
        <b>
            {name}
        </b>: {text}
    </div>
);

Message.propTypes = {
    owner: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
};

export default Message;
