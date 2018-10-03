import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 0
    }
  }

  toggle = () => {
    this.setState({visible: !this.state.visible});
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

  render() {
    const header = {cursor: 'pointer'};
    const hide = {display: 'none'};
    const ds = {display:'', background: '#f8f8f8', marginLeft: 10, padding: 2};
    const blog = this.props.blog;
    const detailsStyle = this.state.visible ? ds : hide;
    const buttonStyle = this.determineButtonStyle();
    return (
      <div className='content' style={{borderWidth: 1, border: 'solid', padding: 4, margin:2}}>
        <div className='header' id='toggleShow' onClick={this.toggle} style={header}>{blog.title} {blog.author}</div>
        <div className='details' style={detailsStyle}>
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button onClick={this.incrementLike}>like</button><br />
          added by {blog.user ? blog.user.name : 'anonymous'}<br />
          <button style={buttonStyle} onClick={this.delete}>delete</button>
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
