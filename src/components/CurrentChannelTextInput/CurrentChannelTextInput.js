import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FETCHED, OFFLINE } from './../../actions';

const CurrentChannelTextInput = ({ text = "", submitMessage, updateText, activeChannel, fetchStatus, userStatus }) => {
    const handlesubmit = (e) => {
        e.preventDefault();
        submitMessage(text, activeChannel);
    };

    const buttonClass = classnames('btn', 'btn-default', { disabled: userStatus === OFFLINE });

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="input-group">
                    <input
                        value={text}
                        type="text"
                        className="form-control"
                        placeholder={(userStatus !== OFFLINE) ? `Say something` : `You are offline`}
                        onChange={(e) => updateText(e.target.value, activeChannel)}
                        disabled={fetchStatus !== FETCHED || userStatus === OFFLINE}
                    />
                    <span className="input-group-btn">
                        <button className={buttonClass} type="button">Submit</button>
                    </span>
                </div>
            </form>
        </div>
    );
};

CurrentChannelTextInput.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    activeChannel: PropTypes.string.isRequired,
    submitMessage: PropTypes.func.isRequired,
    updateText: PropTypes.func.isRequired,
    fetchStatus: PropTypes.string.isRequired,
    userStatus: PropTypes.string.isRequired,
};

export default CurrentChannelTextInput;

