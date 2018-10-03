import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='titleauthor'>
      {blog.title} {blog.author}
    </div>
    <div className='likes'>
      blog has {blog.likes} likes
      <button id='likeButton' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
