import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { OFFLINE, FETCHED, FETCHING } from './../../actions';
import MessageContainer from './../Message/MessageContainer';

const ChannelContent = ({ messages, channelName, status, fetchStatus }) => (
    <div>
        <h4>
            Channel: {channelName}
        </h4>
        {
            status === OFFLINE ?
                <h5>
                    Contacts in the channel will see you as offline.
                </h5>
                :
                null
        }
        <div>
            {
                messages.map( (message) => (
                    <div key={message.get(`id`)}>
                        <MessageContainer message={message} />
                    </div>
                ))
            }
        </div>
    </div>
);

ChannelContent.propTypes = {
    messages: ImmutablePropTypes.list.isRequired,
    channelName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    fetchStatus: PropTypes.string.isRequired,
};

export default ChannelContent;
