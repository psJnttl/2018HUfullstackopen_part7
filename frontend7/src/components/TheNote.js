import React from 'react';
import PropTypes from 'prop-types'

const TheNote = ({note, style}) => {
  if (!note) {
    return null;
  }
  return (
    <div className={style}>
      {note}
    </div>
  )
}

TheNote.propTypes = {
  note: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired
};

export default TheNote;
