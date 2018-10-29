import blogService from '../services/blogs';
import { loadAllUsers } from './userReducer';

const blogReducer = (state=[], action) => {
  switch (action.type) {
  case 'ADD_ALL_BLOGS':{
    let newState = [...action.data.blogs];
    return newState;
  }
  case 'ADD_ONE_BLOG':{
    const blogsPlusOne = state.concat(action.data);
    return blogsPlusOne;
  }
  case 'DELETE_ONE_BLOG':{
    const blogsMinusOne = state.filter((b) => {
      return action.id !== b.id;
    });
    return blogsMinusOne;
  }
  default:
    return state;
  }
};

export const addAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'ADD_ALL_BLOGS',
      data: {
        blogs
      }
    });
  };
};

export const createBlog = (blog, token, showNote) => {
  return async (dispatch) => {
    const response = await blogService.postBlog(blog, token, showNote);
    if (response) {
      dispatch(addAllBlogs());
      dispatch(loadAllUsers());
    }
  };
};

export const deleteOneBlog = (blog, token, showNote) => {
  return async (dispatch) => {
    const response = await blogService.deleteBlog(blog, token, showNote);
    if (response && response.status && response.status === 204) {
      dispatch({
        type: 'DELETE_ONE_BLOG',
        id: blog.id
      });
      dispatch(addAllBlogs());
      dispatch(loadAllUsers());
    }
  };
};

export const voteBlog = (blog, id, showNote) => {
  return async (dispatch) => {
    const response = await blogService.putBlog(blog, id, showNote);
    if (response) {
      dispatch(addAllBlogs());
    }
  };
};

export const commentBlog = (comment, showNote) => {
  return async (dispatch) => {
    const response = await blogService.postComment(comment, showNote);
    if (response && response.status && response.status === 201) {
      dispatch(addAllBlogs());
    }
  };
};

export default blogReducer;
