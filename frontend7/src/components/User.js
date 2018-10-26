import React from 'react';
import { List } from 'semantic-ui-react';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  const blogList = user.blogs.map((b) => {
    return (
       <List.Item key={b._id}>
         {b.title}
       </List.Item>);
  });
  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <List ordered>
        {blogList}
      </List>
    </div>
  );
};

export default User;
