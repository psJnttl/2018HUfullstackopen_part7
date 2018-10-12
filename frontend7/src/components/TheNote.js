import React from 'react';
import PropTypes from 'prop-types'

const TheNote = ({note}) => {
  if (!note) {
    return null;
  }
  return (
    <div className={note.style}>
      {note.message}
    </div>
  )
}

TheNote.propTypes = {
  note: PropTypes.object.isRequired,
  style: PropTypes.string.isRequired
};

export default TheNote;
