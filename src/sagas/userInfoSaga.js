import fetch from 'isomorphic-fetch';
import { fromJS } from 'immutable';
import { call, put, takeEvery, select, fork } from 'redux-saga/effects';

import { SET_CHANNEL_INFO } from './../actions';
import { userSelector } from './../selectors';
import { updateUserFetchStatus, setUserInfo, FETCHING, FETCHED, NOT_FETCHED } from './../actions';

function* fetchUserInfo(id) {
    // Get the user with that Id
    const user = yield select(userSelector(id));

    // If his data are not yet fetched, fetch them. Else do nothing.
    if (user.get(`fetchStatus`) === NOT_FETCHED) {
        yield put(updateUserFetchStatus(id, FETCHING));
        const response = yield call(()=>fetch(`/user/${id}`));
        const userInfo = yield call(()=>response.json());
        yield put(updateUserFetchStatus(id, FETCHED));
        yield put(setUserInfo(fromJS(userInfo)));
    }
}

function* fetchChannelUsers({ channel }) {
    // List of user ids that participate in the new channel that maybe we have not
    // already fetched the informarion about them.
    const ids = channel.get(`participants`);
    for (let id of ids) {
        // fork will create different child processes for each argument (this case id)
        // meaning it will make a seperate parallel AJAX call by calling fetchUserInfo.
        yield fork(fetchUserInfo, id);
    }
}

export function* userInfoSaga() {
    yield takeEvery(SET_CHANNEL_INFO, fetchChannelUsers);
}
