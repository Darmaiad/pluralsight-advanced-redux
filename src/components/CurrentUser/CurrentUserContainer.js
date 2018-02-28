import { connect } from 'react-redux';
import CurrentUser from './CurrentUser';

const mapStateToProps = (state) => {
    // Preferably pass immutable objects 
    const currentUser = state.get('currentUser');
    return {
        name: currentUser.get('name'),
        status: currentUser.get('status'),
        id: currentUser.get('id'),
    };
};

const mapdispatchToProps = (dispatch) => ({
    // Destructuring event.target.value
    updateStatus: ({ target: { value } }) => {
        console.log('updating status: ', value);
    },
});

const CurrentUserContainer = connect(
    mapStateToProps,
    mapdispatchToProps
)(CurrentUser);

export default CurrentUserContainer;
