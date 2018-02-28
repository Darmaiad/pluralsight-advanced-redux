import React from 'react';
import { connect } from 'react-redux';

import CurrentChannelTextInput from './CurrentChannelTextInput';

// todo... add actions and selectors

const mapStateToProps = (state) => {
    const activeChannel = state.get(activeChannel);
    return {
        activeChannel: activeChannel,
        text: "Demo Text",
        fetchStatus: "FETCHED",
        userStatus: "ONLINE",
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateText: (text, channel) => {
        console.log("Update text...");
    },
    submitMessage: (text, channel) => {
        console.log("Submit message");
    },
});

const CurrentChannelTextInputContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentChannelTextInput);

export default CurrentChannelTextInputContainer;
