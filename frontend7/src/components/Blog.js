import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newcomment: ''
    }
  }

  incrementLike = () => {
    const blog = this.props.blog;
    const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user ? blog.user._id : undefined
    };
    this.props.onUpdate(updatedBlog, blog.id);
  }

  delete = () => {
    let blog = this.props.blog;
    let result = window.confirm("Delete '" + blog.title + "', really? ");
    if (result) {
      this.props.history.push('/');
      this.props.onDelete(blog);
    }
  }

  determineButtonStyle = () => {
    let blog = this.props.blog;
    let logged = this.props.logged;
    if ((blog.user && blog.user.username === logged.username)
         || (!blog.user) ) {
      return {display: ''};
    }
    else {
      return {display: 'none'};
    }
  }

  handleInputChange = (event) => {
    this.setState({newcomment: event.target.value});
  }

  handlePostComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: this.state.newcomment,
      blogId: this.props.blog.id
    }
    this.setState({ newcomment: '' });
    this.props.postComment(newComment, this.props.history);
  }

  render() {
    if (!this.props.blog) {
      return null;
    }
    const blog = this.props.blog;
    const buttonStyle = this.determineButtonStyle();
    let comments;
    if (blog.comments.length > 0) {
      comments = blog.comments.map(c => {
        return (
          <li key={c._id}>{c.content}</li>
        );
      })
    }
    return (
      <div className='content' >
        <h3>
          {blog.title} {blog.author}
        </h3>
        <div style= {{padding: 3}}>
          <a href={blog.url}>{blog.url}</a><br />
        </div>
        <div style= {{padding: 3}}>
          {blog.likes} likes <button onClick={this.incrementLike}>like</button><br />
        </div>
        <div style= {{padding: 3}}>
          added by {blog.user ? blog.user.name : 'anonymous'}<br />
        </div>
        <div style= {{padding: 3}}>
          <button style={buttonStyle} onClick={this.delete}>delete</button>
        </div>
        <div style={{ padding: 3}}>
          <h4>comments</h4>
          <input value={this.state.newcomment}
            type='text'
            onChange={this.handleInputChange}
            name='newcomment'
            id='newcomment'
            autoComplete="off"
          />
          <form id='blogForm' onSubmit={this.handlePostComment}>
            <button id='submitButton' type="submit">add comment</button>
          </form>
          <ul>
            { comments }
          </ul>
        </div>
      </div>
    );
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  logged: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Blog;
