import { UPDATE_STATUS } from './../actions';
import { currentUserSelector } from './../selectors';
// effects are ways (object) of taking info from your app and putting them inside a saga and vice versa.
// They are always used in conjunction with the yield keyword.
import { takeLatest, call, select } from 'redux-saga/effects';

// Each time UPDATE_STATUS runs it will run putUserStatus Generator function.
export function* currentUserStatusSaga() {
    // yield instead or return, meaning the thread that called it has to resume.
    yield takeLatest(UPDATE_STATUS, putUserStatus);
}

function* putUserStatus({ status }) {
    // Find the current user with the 'select' effect and the selector.
    const currentUser = yield select(currentUserSelector);
    const id = currentUser.get('id');
    console.log('Put user status');
    // Call an outside method with the 'call' effect.
    // Whatever is in the call bracket will be executed when the app is in this line of code
    // and the results will be yielded in the parent function.
    // In this instance the results of the call to the API.
    yield call(() => fetch(`/status/${id}/${status}`));
}
