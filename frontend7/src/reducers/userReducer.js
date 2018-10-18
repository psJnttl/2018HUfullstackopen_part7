const userReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_ALL_USERS':
      let newState = [...action.data.users];
      return newState;

    default:
      return state;
  }
}

export const addAllUsers = (users) => {
  return {
    type: 'ADD_ALL_USERS',
    data: {
      users
    }
  };
};

export default userReducer;
