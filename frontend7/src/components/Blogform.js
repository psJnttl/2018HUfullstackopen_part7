import React from 'react';
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react';


class Blogform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author:'',
      title:'',
      url:''
    }
  }
  componentWillMount() {}
  render() {
    return (
      <Form id='blogForm' onSubmit={this.handleBlogPost}>
        <Form.Field>
          Author:
          <input value={this.state.author}
                  type='text'
                  onChange={this.handleInputChange}
                  name='author'
                  id='author'
          />

        </Form.Field>
        <Form.Field>
          title:
          <input value={this.state.title}
                type='text'
                onChange={this.handleInputChange}
                name='title'
                id='title'
                autoComplete="off"
          />
        </Form.Field>
        <Form.Field>
          url:
          <input value={this.state.url}
                type='text'
                onChange={this.handleInputChange}
                name='url'
                id='url'
                autoComplete="off"
          />
        </Form.Field>
        <Button positive id='submitButton' type="submit">Submit</Button>
      </Form>
    );
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    if (name === 'author') {
      this.setState({author: event.target.value});
    }
    else if (name === 'title') {
      this.setState({title: event.target.value});
    }
    else if (name === 'url') {
      this.setState({url: event.target.value});
    }
  }

  handleBlogPost = (event) => {
    event.preventDefault();
    const newBlog = {
      author: this.state.author,
      title: this.state.title,
      url: this.state.url
    }
    this.setState({author: '', title: '', url: ''});
    this.props.postBlog(newBlog);
  }
}

Blogform.propTypes = {
  postBlog: PropTypes.func.isRequired
};

export default Blogform;
