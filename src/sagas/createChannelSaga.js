import { takeEvery, put, call } from 'redux-saga/effects';

import { REQUEST_CREATE_CHANNEL, completeChannelCreation } from './../actions';

function* requestCreateChannel({ ownID, contactID, channelName, channelID }) {
    const participants = JSON.stringify([ownID, contactID]);
    // We take the event and pass it as a request to the server.
    yield call(()=>fetch(`/channel/create/${channelID}/${channelName}/${participants}`));
    // Return a success action
    yield put(completeChannelCreation(channelID, true));
}

export function* createChannelSaga() {
    yield takeEvery(REQUEST_CREATE_CHANNEL, requestCreateChannel);
}
