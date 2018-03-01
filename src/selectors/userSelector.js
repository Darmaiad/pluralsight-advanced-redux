import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

// Curried selector
export const userSelector = (id) => createSelector(
    (state) => state.get('userInfo'),
    (userInfo) => {
        const user = userInfo.find((user) => user.get('id') === id);
        
        if (user) {
            return user;
        } else {
            return fromJS({
                name: '[...]',
                id,
                fetchStatus: 'NOT_FETCHED',
            });
        }
    }
);
