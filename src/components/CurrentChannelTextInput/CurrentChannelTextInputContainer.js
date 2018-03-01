import React from 'react';
import { connect } from 'react-redux';

import CurrentChannelTextInput from './CurrentChannelTextInput';
import { submitChannelInputText, updateChannelInputText } from './../../actions';
import { currentUserSelector, activeChannelSelector } from './../../selectors';

const mapStateToProps = (state) => ({
    activeChannelId: activeChannelSelector(state).get('id'),
    text: activeChannelSelector(state).get('currentUserText'),
    fetchStatus: activeChannelSelector(state).get('fetchStatus'),
    userStatus: currentUserSelector(state).get('status'),
});

const mapDispatchToProps = (dispatch) => ({
    updateText: (text, channelId) => {
        dispatch(updateChannelInputText(text, channelId));
    },

    submitMessage: (text, channel) => {
        dispatch(submitChannelInputText(channel, text));
    },
});

const CurrentChannelTextInputContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentChannelTextInput);

export default CurrentChannelTextInputContainer;
