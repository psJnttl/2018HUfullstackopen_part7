import React from 'react';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  const blogList = user.blogs.map((b) => {
    return (
       <li key={b._id}>
         {b.title}
       </li>);
  });
  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {blogList}
      </ul>
    </div>
  );
};

export default User;
