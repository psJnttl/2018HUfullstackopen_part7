import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

const newBlog = {
  title: 'No Silver Bullet',
  author: 'Frederick P. Brooks',
  likes: 11
};
const mockLikeButtonHandler = jest.fn();

describe('<SimpleBlog />', () => {
  let blogComponent;

  beforeEach(() => {
    blogComponent = shallow(
      <SimpleBlog
        blog={newBlog}
        onClick={mockLikeButtonHandler}
      />
    );
    mockLikeButtonHandler.mock.calls = [];
  });

  it('renders title, author and likes', () => {
    const titleauthor = blogComponent.find('.titleauthor');
    expect(titleauthor.text()).toContain(newBlog.title);
    expect(titleauthor.text()).toContain(newBlog.author);
    const likes = blogComponent.find('.likes');
    expect(likes.text()).toContain(newBlog.likes);
  });

  it('like button click detected', () => {
    const likeButton = blogComponent.find('#likeButton');
    likeButton.simulate('click');
    likeButton.simulate('click');
    expect(mockLikeButtonHandler.mock.calls.length).toEqual(2);
  });
});
