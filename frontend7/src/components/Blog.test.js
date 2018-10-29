import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

const newBlog = {
  title: 'No Silver Bullet',
  author: 'Frederick P. Brooks',
  url: 'https://ieeexplore.ieee.org/document/1663532/',
  likes: 11
};
const mockLoggedUser = { username: 'johmsmith' };
const mockOnUpdateHandler = jest.fn();
const mockOnDeleteHandler = jest.fn();

describe('<Blog />', () => {
  let blogComponent;
  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        blog={newBlog}
        logged={mockLoggedUser}
        onUpdate={mockOnUpdateHandler}
        onDelete={mockOnDeleteHandler}
      />
    );
  });

  it('By default only title and author should be shown.', () => {
    const detailsDiv = blogComponent.find('.details');
    const detailsStyle = detailsDiv.getElement().props.style;
    expect(detailsStyle.display).toEqual('none');
  });

  it('Clicking header once reveals blog details.', () => {
    const detailsDivBefore = blogComponent.find('.details');
    const detailsStyleBefore = detailsDivBefore.getElement().props.style;
    const button = blogComponent.find('.header');
    button.simulate('click');
    const detailsDivAfter = blogComponent.find('.details');
    const detailsStyleAfter = detailsDivAfter.getElement().props.style;
    expect(detailsStyleBefore.display).toEqual('none');
    expect(detailsStyleAfter.display).toEqual('');
  });

  it('Clicking header twice hides blog details.', () => {
    const button = blogComponent.find('.header');
    button.simulate('click');
    button.simulate('click');
    const detailsDiv = blogComponent.find('.details');
    const detailsStyle = detailsDiv.getElement().props.style;
    expect(detailsStyle.display).toEqual('none');
  });

});
