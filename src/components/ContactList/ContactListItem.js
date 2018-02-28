import React from 'react';
import PropTypes from 'prop-types';
import Chance from 'chance';

import { OFFLINE } from './../../actions';

const ContactListItem = ({ id, name, status, openChannel }) => (
    <div>
        <div className="media">
            <div className="media-left">
                <a href="#">
                    <img className="media-object" style={{ width: 75, height: 75, backgroundColor: new Chance(id).color({ format: "rgb" }) }} />
                </a>
            </div>
            <div className="media-body">
                <h4 className="media-heading">{name}</h4>
                {status !== OFFLINE ? <span className="btn btn-default" onClick={() => openChannel(id)} disabled={!status || status === OFFLINE}>
                    Chat
                </span> : <span>(Offline)</span>}
            </div>
        </div>
    </div>
);

ContactListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    openChannel: PropTypes.func.isRequired,
};

export default ContactListItem;
