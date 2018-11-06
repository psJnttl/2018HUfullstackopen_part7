import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Grid, List } from 'semantic-ui-react';
import ConfirmModal from './ConfirmModal';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newcomment: '',
      modalVisible: false
    };
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
    const blog = this.props.blog;
    this.setState({ question: 'Delete \'' + blog.title + '\', really? ', modalVisible: true });
  }

  handleResponse = (response) => {
    this.setState({ modalVisible: false });
    if (response === 'yes') {
      this.props.history.push('/');
      this.props.onDelete(this.props.blog);
    }
  }

  determineButtonStyle = () => {
    let blog = this.props.blog;
    let logged = this.props.logged;
    if ((blog.user && blog.user.username === logged.username)
         || (!blog.user) ) {
      return { display: '' };
    }
    else {
      return { display: 'none' };
    }
  }

  handleInputChange = (event) => {
    this.setState({ newcomment: event.target.value });
  }

  handlePostComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: this.state.newcomment,
      blogId: this.props.blog.id
    };
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
          <List.Item key={c._id}>{c.content}</List.Item>
        );
      });
    }
    return (
      <div className='wrapper' >
        <ConfirmModal
          visible={this.state.modalVisible}
          header='Delete Blog'
          question={this.state.question}
          response={this.handleResponse}
        />
        <Container>
          <Grid>
            <Grid.Row>
              <div className='blogtitle'>
                <h3>{blog.title} {blog.author}</h3>
              </div>
            </Grid.Row>
            <Grid.Row>
              <div className='blogurl'>
                <a href={blog.url}>{blog.url}</a><br />
              </div>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className='bloglikes'>
                  {blog.likes} likes
                </div>
              </Grid.Column>
              <Grid.Column>
                <Button positive onClick={this.incrementLike}>like</Button><br />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <div className='blogaddedby'>
                added by {blog.user ? blog.user.name : 'anonymous'}<br />
              </div>
            </Grid.Row>
            <Grid.Row>
              <Button negative style={buttonStyle} onClick={this.delete}>delete</Button>
            </Grid.Row>
            <Grid.Row>
              <Form onSubmit={this.handlePostComment}>
                <Form.Field>
                  <input value={this.state.newcomment}
                    type='text'
                    onChange={this.handleInputChange}
                    name='newcomment'
                    id='newcomment'
                    autoComplete="off"
                  />
                </Form.Field>
                <Button type="submit">add comment</Button>
              </Form>
            </Grid.Row>
            <div className='blogcomments'>
              <List bulleted>
                { comments }
              </List>
            </div>
          </Grid>
        </Container>
      </div>
    );
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  logged: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired
};

export default Blog;
