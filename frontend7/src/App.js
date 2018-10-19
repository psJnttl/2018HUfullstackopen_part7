import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Loginform from './components/Loginform'
import LoginService from './services/login'
import LoginState from './components/LoginState'
import TheNote from './components/TheNote'
import './index.css'
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Main from './components/Main';
import Users from './components/Users';
import User from './components/User';
import BlogTitle from './components/BlogTitle';
import { showNote, hideNote } from './reducers/notificationReducer';
import { loadAllUsers } from './reducers/userReducer';
import { addAllBlogs, createBlog, deleteOneBlog, voteBlog } from './reducers/blogReducer';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      note: '',
      noteStyle: '',
    }
  }

  userById = (id) => {
    return this.props.users.find((u) => {
      return id === u.id;
    })
  }

  blogById = (id) => {
    return this.props.blogs.find((b) => {
      return id === b.id;
    })
  }

  componentDidMount() {
    this.props.addAllBlogs();
    this.props.loadAllUsers();
    const storedUser = window.localStorage.getItem('BlogAppLoggedUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.username && parsedUser.name && parsedUser.token) {
        this.setState({user: parsedUser});
      }
    }
  }

  render() {
    this.props.blogs.sort( (a, b) => {
      return b.likes - a.likes;
    }); //  CANNOT WORK! DONT CHANGE IN PLACE !!!
    let blogList = null;
    if (this.state.user) {
      //const blogs = this.context.store.getState().blogs;
      blogList = this.props.blogs.map(blog =>
        <BlogTitle
          key={blog.id}
          blog={blog}
          logged={this.state.user}
          onUpdate={this.putBlog}
          onDelete={this.deleteBlog}
        />
      );
    }
    return (
      <div>
        <TheNote />
        { this.state.user === null &&
          <Loginform
            onUserLogin={this.loginPost}
          />
        }
        {this.state.user !== null &&
          <div>
            <BrowserRouter>
              <div>
                <h2>blogs</h2>
                <div>
                  <LoginState user={this.state.user}
                    logout={this.logout} />
                </div>
                <div>
                </div>
                <Route exact path="/" render={() => <Main blogList={blogList} postBlog={this.postBlog} />} />
                <Route exact path="/users" render={() => <Users />} />
                <Route exact path="/users/:id" render={({match}) =>
                  <User user={this.userById(match.params.id)} />} />
                <Route exact path="/blogs/:id" render={({match, history}) =>
                  <Blog
                    blog={this.blogById(match.params.id)}
                    logged={this.state.user}
                    onUpdate={this.putBlog}
                    onDelete={this.deleteBlog}
                    history={history}
                    postComment={this.postComment}
                  />} />
                <Route exact path='/blogs' render={ () => <Redirect to='/' /> } />
              </div>
            </BrowserRouter>
          </div>
        }
      </div>
    );
  }

  loginPost = async (username, password) => {
    try {
      const result = await LoginService.login(username, password);
      this.setState({user: result});
      window.localStorage.setItem('BlogAppLoggedUser', JSON.stringify(result));
    }
    catch (error) {
      if (error.response.data.error) {
        const msg = error.response.data.error;
        this.showNotification("Kirjautuminen epäonnistui, serverin viesti: " + msg, "failnote", 7000);
      }
      else {
        this.showNotification("Kirjautuminen epäonnistui: ", "failnote", 7000);
      }
    }
  }

  logout = () => {
    this.setState({user: null});
    window.localStorage.removeItem('BlogAppLoggedUser');
  }

  postBlog = async (blog) => {
    this.props.createBlog(blog, this.state.user.token);
  }

  putBlog = async (blog, id) => {
    this.props.voteBlog(blog, id);
  }

  deleteBlog = async(blog) => {
    const token = this.state.user.token;
    this.props.deleteOneBlog(blog, token);
  }

  postComment = async(comment, history) => {
    const response = await blogService.postComment(comment, this.showNotification);

    if (response && response.status && response.status === 201) {
      const blogs = await blogService.getAll();
      this.setState({blogs: blogs});
    }
  }

  showNotification = (msg, css, duration) => {
    this.context.store.dispatch(showNote(msg, css));
    setTimeout( () => {
      this.context.store.dispatch(hideNote());
    }, duration);
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    users: state.users,
    blogs: state.blogs
  };
};
const mapDispatchToProps = {
  addAllBlogs: addAllBlogs,
  createBlog: createBlog,
  deleteOneBlog: deleteOneBlog,
  voteBlog: voteBlog,
  loadAllUsers: loadAllUsers
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp;
