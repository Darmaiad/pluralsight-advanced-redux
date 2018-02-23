import { connect } from 'react-redux';
import { CurrentUser } from './CurrentUser';

const mapStateToProps = (state) => {
    const currenUser = state.get('currentUSer');
    return {
        name: currenUser.get('name'),
        status: currenUser.get('status'),
        id: currenUser.get('id'),
    };
};

const mapdispatchToProps = (dispatch) => ({
    updateStatus: ({ target: { value } }) => {
        console.log('updating status: ', value);
    },
});

export const CurrentUserContainer = connect(
    mapStateToProps,
    mapdispatchToProps
)(CurrentUser);
