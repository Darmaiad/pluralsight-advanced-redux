import { chance } from './../utility';
import { currentUserSelector } from './../selectors';

// This is the constant (action type) that the reducers will listen for
export const SUBMIT_CHANNEL_INPUT_TEXT = 'SUBMIT_CHANNEL_INPUT_TEXT';

export const submitChannelInputText = (channel, text) => (dispatch, getState) =>
    dispatch({
        type: SUBMIT_CHANNEL_INPUT_TEXT,
        channel,
        text,
        owner: currentUserSelector(getState()).get('id'), // Id of the user that wrote the message
        id: chance.guid(), // Id of the action
    });
