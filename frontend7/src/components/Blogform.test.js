import React from 'react'
import { shallow } from 'enzyme'
import Blogform from './Blogform'

describe('<Blogform />', () => {

  const newBlog = {
    title: 'No Silver Bullet',
    author: 'Frederick P. Brooks',
    url: 'https://ieeexplore.ieee.org/document/1663532/',
    likes: 11
  };

  const mockOnSubmitHandler = jest.fn();
  let blogformComponent = shallow(
    <Blogform
      postBlog={mockOnSubmitHandler} />
    );

  it('Sends blog object to (props) post method.', () => {
    const inputAuthor = blogformComponent.find('#author');
    const inputTitle = blogformComponent.find('#title');
    const inputUrl = blogformComponent.find('#url');
    expect(inputAuthor.props().value).toEqual('');
    expect(inputTitle.props().value).toEqual('');
    expect(inputUrl.props().value).toEqual('');
    inputAuthor.simulate('change', {target: {value: newBlog.author, name: 'author'}});
    inputTitle.simulate('change', {target: {value: newBlog.title, name: 'title'}});
    inputUrl.simulate('change', {target: {value: newBlog.url, name: 'url'}});
    const inputAuthor2 = blogformComponent.find('#author');
    expect(inputAuthor2.props().value).toEqual(newBlog.author);
    const inputTitle2 = blogformComponent.find('#title');
    expect(inputTitle2.props().value).toEqual(newBlog.title);
    const inputUrl2 = blogformComponent.find('#url');
    expect(inputUrl2.props().value).toEqual(newBlog.url);
    const submitForm = blogformComponent.find('#blogForm');
    submitForm.simulate('submit', {target:{value: ''}, preventDefault: ()=>{}});
    const submitted = mockOnSubmitHandler.mock.calls[0][0];
    expect(submitted.author).toEqual(newBlog.author);
    expect(submitted.title).toEqual(newBlog.title);
    expect(submitted.url).toEqual(newBlog.url);
  });

});
