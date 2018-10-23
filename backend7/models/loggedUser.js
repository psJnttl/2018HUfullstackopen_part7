const mongoose = require('mongoose');

const LoggedUserSchema = new mongoose.Schema({
  name: String,
  username: String,
  token: String
});

LoggedUserSchema.statics.formatLoggedUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    username: user.username,
    token: user.token
  };
};

const LoggedUser = mongoose.model('LoggedUser', LoggedUserSchema);

module.exports = LoggedUser;
