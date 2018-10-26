import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

const TheNote = ( props) => {
  const { note } = props;
  if (!note) {
    return null;
  }
  let p, n;
  if (note.style === 'oknote') {
    p = true; n = false;
  }
  else if (note.style === 'failnote') {
    n = true; p = false;
  }
  else {
    return null;
  }
  return (
    <Message positive={p} negative={n}>
      {note.message}
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    note: {
      message: state.notification.message,
      style: state.notification.style
    }
  }
};
const ConnectedNote = connect(mapStateToProps)(TheNote);
export default ConnectedNote;
