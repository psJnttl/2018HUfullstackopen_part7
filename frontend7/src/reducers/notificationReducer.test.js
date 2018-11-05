import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notificationReducer', () => {
  const initialState = { message: '', style: '' };
  const displayedMessage = {
    message: 'All tests passed!',
    style: 'oknote'
  };

  it('returns state unchanged when called with unknown action', () => {
    const action = {
      type: 'UNKNOWN'
    };
    const state = initialState;
    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('shows requested message using given style', () => {
    const action = {
      type: 'SHOW_MESSAGE',
      data: {
        message: 'All tests passed!',
        style: 'oknote'
      }
    };
    const state = initialState;
    deepFreeze(state);
    const state2 = notificationReducer(state, action);
    expect(state2).toEqual(displayedMessage);
  });

  it('hides displayed message when requested', () => {
    const action = { type: 'HIDE_MESSAGE' };
    const state = displayedMessage;
    const state2 = notificationReducer(state, action);
    expect(state2).toEqual(initialState);
  });

});
