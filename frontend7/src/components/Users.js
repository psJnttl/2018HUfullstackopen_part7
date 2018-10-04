import React from 'react';
import { Link } from 'react-router-dom';

const Users = (props) => {
  const userList = props.users.map( (item) => {
    return <tr key={item.id}>
      <td>
        <Link to={'/users/' + item.id}>
          {item.name}
        </Link>
      </td>
      <td>{item.blogs.length}</td>
    </tr>
  });

  return (
    <div>
      <h3>users</h3>
      <table>
        <thead>
          <tr><th>name</th><th>blogs added</th></tr>
          </thead>
        <tbody>
          {userList}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
