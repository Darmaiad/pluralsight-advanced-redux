import React from 'react';
import PropTypes from 'prop-types';

import ChannelListItem from './ChannelListItem';

const ChannelList = ({ channels, activeChannel, setActiveChannel }) => (
    <div>
        <div>
            <h3>Channels</h3>
        </div>
        <div className="list-group">
            {channels.map((channel) =>
                (<ChannelListItem id={channel.get(`id`)}
                    key={channel.get(`id`)}
                    name={channel.get(`name`)}
                    setActiveChannel={setActiveChannel}
                    isActive={channel.get(`id`) === activeChannel}
                />)
            )}
        </div>
    </div>
);

ChannelList.propTypes = {
    activeChannel: PropTypes.string.isRequired,
    channels: PropTypes.object.isRequired,
    setActiveChannel: PropTypes.func.isRequired,
};

export default ChannelList;
