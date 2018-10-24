import loggedService from '../services/loggedService';

const initialState = { name: '', username:'' };

const loggedReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_USER':
      const { user } = action;
      return Object.assign({}, user);
    case 'DEL_LOGGED_USER':
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export const loadLoggedUser = () => {
  return async (dispatch) => {
    const user = await loggedService.getLoggedUser();
    dispatch({
      type: 'SET_LOGGED_USER',
      user: user
    });
    return user;
  }
}

export const setLoggedUser = (user) => {
  return async (dispatch) => {
    const loggedUser = await loggedService.setLoggedUser(user);
    dispatch({
      type: 'SET_LOGGED_USER',
      user: loggedUser
    });
  }
};

export const delLoggedUser = () => {
  return async (dispatch) => {
    const response = await loggedService.delLoggedUser();
    if (response && response.status && response.status === 204) {
      dispatch({
        type: 'DEL_LOGGED_USER'
      });
    }
  }
};

export default loggedReducer;
