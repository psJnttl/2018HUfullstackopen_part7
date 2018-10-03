import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Loginform from './components/Loginform'
import LoginService from './services/login'
import LoginState from './components/LoginState'
import Blogform from './components/Blogform'
import TheNote from './components/TheNote'
import './index.css'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      note: '',
      noteStyle: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
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
        <Blog
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
          note={this.state.note}
          style={this.state.noteStyle}
        />
        { this.state.user === null &&
          <Loginform
            onUserLogin={this.loginPost}
          />
        }
        {this.state.user !== null &&
          <div>
            <h2>blogs</h2>
            <div>
              <LoginState user={this.state.user}
                logout={this.logout} />
            </div>
            <div>
              <Togglable buttonLabel='new blog'>
                <Blogform postBlog={this.postBlog}/>
              </Togglable>
            </div>
            {blogList}
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
    }
  }

  showNotification = (msg, css, duration) => {
    this.setState({note: msg, noteStyle: css});
    setTimeout( () => { this.setState({note: null})}, duration );
  }
}

export default App;
