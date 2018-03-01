import React from 'react';
import { connect } from 'react-redux';

import ChannelContent from './ChannelContent';
import { activeChannelSelector } from './../../selectors/activeChannelSelector';

const mapStateToProps = (state) => ({
    messages: activeChannelSelector(state).get('messages'),
    channelName: activeChannelSelector(state).get('name'),
    fetchStatus: activeChannelSelector(state).get('fetchStatus'),
    status: state.get('currentUser').get('status'),
});

const mapDispatchToProps = (dispatch) => ({});

const ChannelContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelContent);

export default ChannelContentContainer;
