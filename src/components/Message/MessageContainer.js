import React from 'react';
import { connect } from 'react-redux';

import Message from './Message';
import { userSelector } from './../../selectors';

// {message} is destructuring of ownProps.message
const mapStateToProps = (state, { message }) => {
    const owner = userSelector(message.get(`owner`))(state);
    return {
        text: message.get(`content`).get(`text`),
        owner: {
            name: owner.get(`fetchStatus`).includes(`FETCHED`) ? owner.get(`name`) : `[...]`,
        },
    };
};

const mapDispatchToProps = (dispatch) => ({});

const MessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);

export default MessageContainer;
