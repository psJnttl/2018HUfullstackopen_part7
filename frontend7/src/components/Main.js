import React from 'react';
import Togglable from './Togglable';
import Blogform from './Blogform';

const Main = (props) => {
  return (
    <div>
      <div>
        <Togglable buttonLabel='new blog'>
          <Blogform postBlog={props.postBlog}/>
        </Togglable>
      </div>
      {props.blogList}
    </div>
  );
}

export default Main;
