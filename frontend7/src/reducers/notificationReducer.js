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

export const showNote = (msg, css) => {
  return {
    type: 'SHOW_MESSAGE',
    data: {
      message: msg,
      style: css
    }
  };
};

export const hideNote = () => {
  return {
    type: 'HIDE_MESSAGE'
  };
};

export const showNotification = (msg, css, duration) => {
  debugger;
  return (dispatch) => {
    dispatch(showNote(msg, css));
    if (duration > 0) {
      setTimeout( () => { dispatch( hideNote()); }, duration);
    }
  }
}

export default notificationReducer;
