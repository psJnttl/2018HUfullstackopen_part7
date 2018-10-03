import React from 'react';
import PropTypes from 'prop-types'

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
      <form id='blogForm' onSubmit={this.handleBlogPost}>
        <table>
          <tbody>
            <tr>
              <td>Author:</td>
              <td>
                <input value={this.state.author}
                  type='text'
                  onChange={this.handleInputChange}
                  name='author'
                  id='author'
                />
              </td>
            </tr>
            <tr>
              <td>title:</td>
              <td>
                <input value={this.state.title}
                  type='text'
                  onChange={this.handleInputChange}
                  name='title'
                  id='title'
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <td>url:</td>
              <td>
                <input value={this.state.url}
                  type='text'
                  onChange={this.handleInputChange}
                  name='url'
                  id='url'
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button id='submitButton' type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
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
