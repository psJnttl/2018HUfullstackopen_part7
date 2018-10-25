import React from 'react';
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react';

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
        <Form onSubmit={this.handleUserLogin}>
          <Form.Field>
            username:
            <input value={this.state.username}
              type='text'
              onChange={this.handleInputChange}
              name='username'
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            password:
            <input value={this.state.password}
              type='password'
              onChange={this.handleInputChange}
              name='password'
            />
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
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
