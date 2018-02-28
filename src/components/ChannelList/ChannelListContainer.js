import React from 'react';
import { connect } from 'react-redux';

import ChannelList from './ChannelList';

const mapStateToProps = (state) => ({
    channels: state.get(`channels`),
    activeChannel: state.get(`activeChannel`),
});

const mapDispatchToProps = (dispatch) => ({
    setActiveChannel: (channel) => {
        console.log("Setting active channel...", channel);
    },
});

const ChannelListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelList);

export default ChannelListContainer;
