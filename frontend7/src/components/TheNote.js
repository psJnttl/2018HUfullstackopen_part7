import React from 'react';
import { connect } from 'react-redux';

const TheNote = ( props) => {
  const { note } = props;
  if (!note) {
    return null;
  }
  return (
    <div className={note.style}>
      {note.message}
    </div>
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
