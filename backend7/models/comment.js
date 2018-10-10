const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
});

CommentSchema.statics.formatComment = (comment) => {
  return {
    id: comment._id,
    content: comment.content,
    blog: comment.blog
  };
};

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
