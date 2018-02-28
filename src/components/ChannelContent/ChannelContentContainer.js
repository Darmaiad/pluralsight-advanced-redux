import React from 'react';
import { connect } from 'react-redux';

import ChannelContent from './ChannelContent';

const mapStateToProps = (state) => {
    // Get the active channel data
    const channel = state.get(`channels`).find( (channel) => channel.get(`id`) === state.get(`activeChannel`));

    return {
        messages: channel.get(`messages`),
        channelName: channel.get(`name`),
        fetchStatus: channel.get(`fetchStatus`),
        status: state.get(`currentUser`).get(`status`),
    };
};

const mapDispatchToProps = (dispatch) => ({});

const ChannelContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelContent);

export default ChannelContentContainer;
