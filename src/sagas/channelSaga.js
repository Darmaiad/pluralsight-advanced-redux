import { fromJS } from 'immutable';
import { takeEvery, select, put, call } from 'redux-saga/effects';
import { channelSelector } from './../selectors';
import { FETCHED, NOT_FETCHED, SET_ACTIVE_CHANNEL, setChannelInfo } from './../actions';

function* fetchChannelInfo({ id }) {
    const selector = channelSelector(id);
    const channel = yield select(selector);

    // Checks id we have all the data of this channel that was just set to active.
    if (channel.get(`fetchStatus`) === NOT_FETCHED) {
        // We use two yields because the API returns a promise (instead of a .then chain).
        // we get the promise's response
        const response = yield call(()=>fetch(`/channel/${id}`));
        const channelInfo = yield call(()=>response.json());
        yield put(setChannelInfo(fromJS({ fetchStatus: FETCHED, ...channelInfo })));
    } else {
        // Just yield ends the execution of the generator function.
        yield;
    }
}

export function* channelSaga() {
    yield takeEvery(SET_ACTIVE_CHANNEL, fetchChannelInfo);
}
