import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { visible, header, question } = this.props;

    return (
      <div>
        <Modal size='tiny' open={visible} onClose={this.props.close}>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <p>{question}</p>
          </Modal.Content>
          <Modal.Actions style={{ background: '#f0f0f0' }}>
            <Button negative onClick={() => this.props.response('no')}>No</Button>
            <Button positive onClick={() => this.props.response('yes')}>Yes</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  response: PropTypes.func.isRequired
};

export default ConfirmModal;
