import React from 'react';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import CurrentUserContainer from './components/CurrentUser/CurrentUserContainer';
import ChannelContentContainer from './components/ChannelContent/ChannelContentContainer';
import ChannelListContainer from './components/ChannelList/ChannelListContainer';
import ContactListContainer from './components/ContactList/ContactListContainer';
import CurrentChannelTextInputContainer from './components/CurrentChannelTextInput/CurrentChannelTextInputContainer';
import DevTools from './components/DevTools/DevTools';

const App = () => (
    <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Redux Messenger</a>
                </div>
            </div>
        </nav>
        <div className="row">
            <div className="col-xs-3">
                <div>
                    <ChannelListContainer />
                </div>
            </div>
            <div className="col-xs-6">
                <div>
                    <ChannelContentContainer />
                </div>
                <div>
                    <CurrentChannelTextInputContainer />
                </div>

            </div>
            <div className="col-xs-3">
                <div>
                    <CurrentUserContainer />
                </div>
                <div>
                    <ContactListContainer />
                </div>
            </div>
        </div>
    </div>
);

export default App;

// App.propTypes = {
//     state: ImmutablePropTypes.map.isRequired,
// };
