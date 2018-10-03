import React from 'react';
import PropTypes from 'prop-types'

class Loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.method = this.method.bind(this);
  }
  method() {}
  componentWillMount() {}
  render() {
    return (
      <div>
        <h2>Login to application</h2>
        <form onSubmit={this.handleUserLogin}>
          username:
          <input value={this.state.username}
            type='text'
            onChange={this.handleInputChange}
            name='username'
            autoComplete="off"
          /><br />
          password:
          <input value={this.state.password}
            type='password'
            onChange={this.handleInputChange}
            name='password'
          />
          <br /><button type="submit">Login</button>
        </form>
      </div>
    );
  }

  handleInputChange = (event) => {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    else if (event.target.name === 'password') {
      this.setState({password: event.target.value});
    }
  }

  handleUserLogin = (event) => {
    this.setState({password: '', username: ''});
    event.preventDefault();
    this.props.onUserLogin(this.state.username, this.state.password);
  }
}

Loginform.propTypes = {
  onUserLogin: PropTypes.func.isRequired
};

export default Loginform;
