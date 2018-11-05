import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Blog from './components/Blog';
jest.mock('./services/blogs');
import blogService from './services/blogs';

describe.skip('<App /> when no user logged.', () => {
  let app;
  beforeEach(() => {
    window.localStorage.clear('BlogAppLoggedUser');
    app = mount(<App />);
  });

  it('Not logged, no blogs visible.', () => {
    let user = window.localStorage.getItem('BlogAppLoggedUser');
    expect(user).toEqual(undefined);
    app.update();
    const blogComponents = app.find(Blog);
    expect(blogComponents.length).toEqual(0);

  });

});

describe.skip('<App /> when user is logged', () => {
  let app;
  beforeEach(() => {
    window.localStorage.setItem('BlogAppLoggedUser', JSON.stringify({
      username: 'johnd', name: 'John Doe', adult: true, token: 'aabbccdd'
    }));
    app = mount(<App />);
  });

  it('Blogs are shown when user is logged in.', () => {
    let user = JSON.parse(window.localStorage.getItem('BlogAppLoggedUser'));
    expect(user.username).toEqual('johnd');
    app.update();
    const blogComponents = app.find(Blog);
    expect(blogComponents.length).toEqual(3);
  });

  it('Blogs have expected content.', () => {
    app.update();
    const content1 = app.state().blogs.find( (b) => {
      return b.content === 'Funktionaalisuus on paradigma.';
    });
    const content2 = app.state().blogs.find( (b) => {
      return b.content === 'Pahimmat kaatuilijat 2018 World Cupissa.';
    });
    const content3 = app.state().blogs.find( (b) => {
      return b.content === 'Ref debuggausta1';
    });
    expect(content1).toBeTruthy();
    expect(content2).toBeTruthy();
    expect(content3).toBeTruthy();

  });
});
