import loggedService from '../services/loggedService';

const initialState = { user:'' }

const loggedReducer = (state=initialState, action) => {
  console.log('state: ', state, ' action: ', action);
  switch (action.type) {
    case 'GET_LOGGED_USER':
      return state;
    case 'SET_LOGGED_USER':
      return action.user;
    case 'DEL_LOGGED_USER':
      return initialState;
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
  }
}

export const getLoggedUser = () => {
  return {
    type: 'GET_LOGGED_USER'
  };
};

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
