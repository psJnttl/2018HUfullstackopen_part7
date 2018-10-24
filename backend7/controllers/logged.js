const loggedRouter = require('express').Router();
const LoggedUser = require('../models/loggedUser');

loggedRouter.get('/', async(request, response) => {
  try {
    const loggedUser = await LoggedUser.find({});
    const result = loggedUser.map((u) => LoggedUser.formatLoggedUser(u));
    let user;
    if (result.length === 1) {
      user = result[0];
    }
    else {
      user = {user: ''};
    }
    response.json(user);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'server error' });
  }
});

loggedRouter.post('/', async(request, response) => {
  try {
    const loggedUser = new LoggedUser(request.body);
    if (!loggedUser.name || !loggedUser.username || !loggedUser.token) {
      return response.status(400).send({error: 'Problem logging user: info missing'});
    }
    const currentLoggedUser = await LoggedUser.find({});
    if (currentLoggedUser.length > 0) {
      return response.status(400).send({error: 'Only one user at a time supported'});
    }
    const resultFromServer = await loggedUser.save();
    const result = LoggedUser.formatLoggedUser(resultFromServer);
    response.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'server error' });
  }
});

loggedRouter.delete('/', async(request, response) => {
  try {
    const loggedUsers = await LoggedUser.find({});
    if (loggedUsers.length === 1) {
      const id = loggedUsers[0]._id;
      const status = await LoggedUser.findByIdAndRemove(id);
      if (status) {
        return response.status(204).end();
      }
    }
    response.status(404).end();
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError' && error.path === '_id') {
      response.status(400).send({ error: 'malformed id' });
    }
    else {
      response.status(500).send({ error: 'server error' });
    }
  }
});


module.exports = loggedRouter;
