import React from 'react';
import { mount, shallow } from 'enzyme';
import Blog from './Blog';

const newBlog = {
  title: 'No Silver Bullet',
  author: 'Frederick P. Brooks',
  url: 'https://ieeexplore.ieee.org/document/1663532/',
  likes: 11,
  comments:['Totally concur', 'No, Enzyme is the answer!']
};
const mockLoggedUser = { username: 'johmsmith' };
const mockOnUpdateHandler = jest.fn();
const mockOnDeleteHandler = jest.fn();
const mockOnPostCommentHandler = jest.fn();

describe('<Blog /> shallow', () => {
  let blogComponent;
  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        blog={newBlog}
        logged={mockLoggedUser}
        onUpdate={mockOnUpdateHandler}
        onDelete={mockOnDeleteHandler}
        postComment={mockOnPostCommentHandler}
      />
    );
  });

  it('Title and author are be shown on the top line.', () => {
    const blogtitleDiv = blogComponent.find('.blogtitle');
    expect(blogtitleDiv.text()).toContain(newBlog.title);
    expect(blogtitleDiv.text()).toContain(newBlog.author);
  });

  it('Blog url is shown.', () => {
    const blogtitleDiv = blogComponent.find('.blogurl');
    expect(blogtitleDiv.text()).toContain(newBlog.url);
  });

  it('Correct number of likes is shown.', () => {
    const blogtitleDiv = blogComponent.find('.bloglikes');
    expect(blogtitleDiv.text()).toContain(newBlog.likes + ' likes');
  });

  it('Blog is determined to be added by anonymous.', () => {
    const blogtitleDiv = blogComponent.find('.blogaddedby');
    expect(blogtitleDiv.text()).toContain('anonymous');
  });

});

describe.skip('<Blog /> mount', () => {
  let blogComponent;
  beforeEach(() => {
    blogComponent = mount(
      <Blog
        blog={newBlog}
        logged={mockLoggedUser}
        onUpdate={mockOnUpdateHandler}
        onDelete={mockOnDeleteHandler}
        postComment={mockOnPostCommentHandler}
      />
    );
  });

  it('Blog comments are listed', () => {
    const blogcommentsDiv = blogComponent.find('.blogcomments');
    const amount = blogcommentsDiv.find('.item');
    amount.forEach(node => {
      console.log(node.debug());
      console.log(node.props());
    });
  });

});
