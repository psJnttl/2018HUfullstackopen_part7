import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const BlogTitle = ({ blog }) => {
  const header = {cursor: 'pointer'};
  return (
    <div style={{borderWidth: 1, border: 'solid', padding: 4, margin:2}}>
      <div className='header' id='toggleShow' style={header}>
        <Link to={'/blogs/'+blog.id}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
}
BlogTitle.propTypes = {
  blog: PropTypes.object.isRequired
};
export default BlogTitle;
