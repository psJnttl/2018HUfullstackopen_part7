import deepFreeze from 'deep-freeze'
import loggedReducer from './loggedReducer'

const loggedUser = {
  username: 'admin',
  name: 'Major Domo'
};
describe('loggedReducer', () => {
  const initialState = { name: '', username:'' };

  it('returns state unchanged when called with unknown action', () => {
    const action = {
      type: 'UNKNOWN'
    };
    const state = initialState;
    deepFreeze(state);
    const newState = loggedReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('sets a logged user', () => {
    const action = {
      type: 'SET_LOGGED_USER',
      user: loggedUser
    };
    const state = initialState;
    deepFreeze(state);
    const newState = loggedReducer(state, action);
    expect(newState).toEqual(loggedUser);
  });

  it('removes logged user', () => {
    const action = {
      type: 'DEL_LOGGED_USER'
    };
    const state = loggedUser;
    deepFreeze(state);
    const newState = loggedReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
