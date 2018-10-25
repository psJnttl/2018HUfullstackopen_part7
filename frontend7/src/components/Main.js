import React from 'react';
import Togglable from './Togglable';
import Blogform from './Blogform';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Main = (props) => {
  let blogList = null;
  if (props.loggedUser && props.blogs) {
    blogList = props.blogs.map(b =>
      <Table.Row key={b.id}>
        <Table.Cell>
          <Link to={'/blogs/'+b.id}>
            {b.title} {b.author}
          </Link>
        </Table.Cell>
      </Table.Row>

    );
  }
  return (
    <div>
      <div>
        <Togglable buttonLabel='new blog'>
          <Blogform postBlog={props.postBlog}/>
        </Togglable>
      </div>
      <Table striped celled>
        <Table.Body>
          {blogList}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Main;
