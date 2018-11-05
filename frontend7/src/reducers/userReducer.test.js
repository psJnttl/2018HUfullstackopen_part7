import deepFreeze from 'deep-freeze'
import userReducer from './userReducer'

const blogUsers = [
  {
    username: 'rob',
    name: 'Robert Sterling',
    adult: true,
  },
  {
    username: 'dam',
    name: 'Damian Johnson',
    adult: true,
  }
];

describe('userReducer', () => {
  const initialState = [];

  it('returns state unchanged when called with unknown action', () => {
    const action = {
      type: 'UNKNOWN'
    };
    const state = initialState;
    deepFreeze(state);
    const newState = userReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('adds a list of users', () => {
    const action = {
      type: 'ADD_ALL_USERS',
      data: { users: blogUsers}
    };
    const state = initialState;
    deepFreeze(state);
    const newState = userReducer(state, action);
    expect(newState).toEqual(blogUsers);
  });

});
