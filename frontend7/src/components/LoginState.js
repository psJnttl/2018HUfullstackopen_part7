import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ConfirmModal from './ConfirmModal';

class LoginState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false}
  }

  render() {
    return (
      <div style={{padding: 10}}>
        <ConfirmModal
          visible={this.state.modalVisible}
          header='Logout'
          question="Are you sure you wan't to log out?"
          response={this.handleResponse}
        />
        <table>
          <thead>
            <tr>
              <td><Link to='/'>blogs</Link></td>
              <td><Link to='/users'>users</Link></td>
              <td>{this.props.user.name}</td>
              <td>logged in</td>
              <td>
                <Button negative onClick={this.handleLogoutClick}>logout</Button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }

  handleLogoutClick = () => {
    this.setState({modalVisible: true});
  }

  handleResponse = (response) => {
    this.setState({modalVisible: false});
    if (response === 'yes') {
      this.props.logout();
    }
  }
}

LoginState.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default LoginState;
