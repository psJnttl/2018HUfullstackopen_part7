const Blog = require('../models/blog');
const User = require('../models/user');
const LoggedUser = require('../models/loggedUser');

const initialBlogs = [
  {
    'title': 'Tekoäly on jaksaa pidempään kuin sinä.',
    'author': 'Teemu Lesonen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
  {
    'title': 'Tunnista tekotunteet.',
    'author': 'Saija Nairanen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
  {
    'title': 'Miten pääsen eroon teko-oppimisesta.',
    'author': 'Henri Hera-Keirinen',
    'url': 'http://127.0.0.1/',
    'likes': 0
  },
];

const getAllBlogs = async () => {
  const blogsRaw = await Blog.find({});
  const blogs = blogsRaw.map( (b) => {
    return Blog.formatBlog(b);
  });
  return blogs;
};

const initialUsers = [
  {
    username: 'leso',
    name: 'Kimmo Lesonen',
    adult: true
  },
  {
    username: 'admin',
    name: 'Adam Ant',
    adult: false
  }
];

const getAllUsers = async () => {
  const usersRaw = await User.find({});
  const users = usersRaw.map( (u) => {
    return User.format(u);
  });
  return users;
};

const initialLogged = [
  {
    'username': 'johnd',
     'name': 'John Doe',
     'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNDQyN2MxNjY2Y2Q5NjM0MGE1NWNkNCIsInVzZXJuYW1lIjoiam9obmQiLCJpYXQiOjE1NDA1Njk0Mjl9.0O31EfOijPcxLaxdnKTIRJmGfG228gDA3YNXSx1qvgk'
  },
  {
    'username': 'joand',
     'name': 'Joan Doe',
     'token': '12345'
  }
];

const getLoggedUsers = async () => {
  const loggedRaw = await LoggedUser.find({});
  const logged = loggedRaw.map ( (l) => {
    return LoggedUser.formatLoggedUser(l);
  });
  return logged;
};

module.exports = {
  initialBlogs, getAllBlogs, initialUsers, getAllUsers, initialLogged, getLoggedUsers
};
