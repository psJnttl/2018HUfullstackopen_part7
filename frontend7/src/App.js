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
import userService from './services/users';
import User from './components/User';
import BlogTitle from './components/BlogTitle';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      note: '',
      noteStyle: '',
      users: []
    }
  }

  userById = (id) => {
    return this.state.users.find((u) => {
      return id === u.id;
    })
  }

  blogById = (id) => {
    return this.state.blogs.find((b) => {
      return id === b.id;
    })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    userService.getAll().then(users => this.setState({users}));
    const storedUser = window.localStorage.getItem('BlogAppLoggedUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.username && parsedUser.name && parsedUser.token) {
        this.setState({user: parsedUser});
      }
    }
  }

  render() {
    this.state.blogs.sort( (a, b) => {
      return b.likes - a.likes;
    });
    let blogList = null;
    if (this.state.user) {
      blogList = this.state.blogs.map(blog =>
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
        <TheNote
          note={this.props.store.getState()}
          style={this.state.noteStyle}
        />
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
                <Route exact path="/users" render={() => <Users users={this.state.users}/>} />
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
    const response = await blogService.postBlog(blog, this.state.user.token, this.showNotification);
    if (response) {
      const blogs = await blogService.getAll();
      this.setState({blogs: blogs});
      const users = await userService.getAll();
      this.setState({users: users});
    }
  }

  putBlog = async (blog, id) => {
    const response = await blogService.putBlog(blog, id, this.showNotification);
    if (response) {
      const blogs = await blogService.getAll();
      this.setState({blogs: blogs});
    }
  }

  deleteBlog = async(blog) => {
    const token = this.state.user.token;
    const response = await blogService.deleteBlog(blog, token, this.showNotification);

    if (response && response.status && response.status === 204) {
      const blogs = await blogService.getAll();
      this.setState({blogs: blogs});
      const users = await userService.getAll();
      this.setState({users: users});
    }
  }

  postComment = async(comment, history) => {
    const response = await blogService.postComment(comment, this.showNotification);

    if (response && response.status && response.status === 201) {
      const blogs = await blogService.getAll();
      this.setState({blogs: blogs});
    }
  }

  showNotification = (msg, css, duration) => {
    this.props.store.dispatch({
      type: 'SHOW_MESSAGE',
      data: {
        message: msg,
        style: css
      }
    });
    setTimeout( () => {
      this.props.store.dispatch({type: 'HIDE_MESSAGE'});
    }, duration)
  }
}

export default App;
