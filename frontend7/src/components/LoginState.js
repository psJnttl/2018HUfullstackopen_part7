import React from 'react';
import PropTypes from 'prop-types'

class LoginState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>{this.props.user.name}</td>
              <td>logged in</td>
              <td>
                <button onClick={this.handleLogoutClick}>logout</button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }

  handleLogoutClick = () => {
    let result = window.confirm("Log out, really? ");
    if (result) {
      this.props.logout();
    }
  }
}

LoginState.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default LoginState;
