const notificationReducer = (state={ message: '',
  style: '' }, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return action.data;
    case 'HIDE_MESSAGE':
      return { message: '', style: '' };
    default:
      return state;
  }
};

export default notificationReducer;
