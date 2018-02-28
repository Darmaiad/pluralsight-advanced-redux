import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ChannelListItem = ({ id, name, setActiveChannel, isActive }) => {
    const handleOnClick = () => setActiveChannel(id);

    const className = classnames('list-group-item', { active: isActive });
    return <a href="#" className={className} onClick={handleOnClick}>{name}</a>;
};

ChannelListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setActiveChannel: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default ChannelListItem;
