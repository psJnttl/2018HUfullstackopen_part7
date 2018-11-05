import deepFreeze from 'deep-freeze'
import blogReducer from './blogReducer'

const blogs2add = [
  {
    title: 'Containers and micro services.',
    author: 'Raymond Klayman',
    url: 'blogstation.org/1',
    likes: 8,
    id: 1
  },
  {
    title: 'Quantum mechanics and data encryption.',
    author: 'Shirley Z. Schöenhofer',
    url: 'blogstation.org/2',
    likes: 3,
    id: 2,
  }
];
const blog2add = {
  title: 'How do You know which design pattern to use?',
  author: 'Wayne W. Yttrium',
  url: 'blogstation/3',
  likes: 86245,
  id: 3
}

describe('blogReducer', () => {
  const initialState = [];

  it('returns state unchanged when called with unknown action', () => {
    const action = {
      type: 'UNKNOWN'
    };
    const state = initialState;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('adds a list of new blogs', () => {
    const action = {
      type: 'ADD_ALL_BLOGS',
      data: {
        blogs: blogs2add
      }
    };
    const state = initialState;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toEqual(blogs2add);
  });

  it('can add one blog', () => {
    const action = {
      type: 'ADD_ONE_BLOG',
      data: blog2add
    };
    const state = blogs2add;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState.length).toEqual(3);
    expect(newState).toEqual(blogs2add.concat(blog2add));
  });

  it('can delete a blog based on id', () => {
    const action = {
      type: 'DELETE_ONE_BLOG',
      id: 1
    };
    const state = blogs2add;
    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState.length).toEqual(1);
    expect(newState[0].likes).toEqual(3);    
  });

});
