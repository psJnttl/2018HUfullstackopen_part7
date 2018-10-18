import blogService from '../services/blogs';
import userService from '../services/users';

const blogReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_ALL_BLOGS':
      let newState = [...action.data.blogs];
      return newState;
    case 'ADD_ONE_BLOG':
      const blogsPlusOne = state.concat(action.data);
      return blogsPlusOne;
    default:
      return state;
  }
}

export const addAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'ADD_ALL_BLOGS',
      data: {
        blogs
      }
    });
  }
}

export const createBlog = (blog, token) => {
  return async (dispatch) => {
    const response = await blogService.postBlog(blog, token);
      if (response) {
        debugger;
        const blogs = await blogService.getAll();
        dispatch({
          type: 'ADD_ONE_BLOG',
          data: response
        });
        const users = await userService.getAll();

    }
  }
}


export default blogReducer;
