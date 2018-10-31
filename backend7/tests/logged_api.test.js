const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const LoggedUser = require('../models/loggedUser');
const { initialLogged, getLoggedUsers } = require('./test_helper');

describe('GET /api/logged', () => {
  beforeAll(async () => {
    await LoggedUser.remove({});
    const loggedObject = new LoggedUser(initialLogged[0]);
    await loggedObject.save();
  });

  test('logged users are returned as json', async () => {
    await api
      .get('/api/logged')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('logged user has username and token', async () => {
    const response = await api
      .get('/api/logged');
    const loggedUser = response.body; // object,not array
    expect(loggedUser.username).toBeDefined();
    expect(loggedUser.token).toBeDefined();
  });

});

describe('POST /api/logged', () => {
  beforeEach(async () => {
    await LoggedUser.remove({});
  });

  test('can store logged user', async () => {
    const newLoggedUser = initialLogged[0];
    await api
      .post('/api/logged')
      .send(newLoggedUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('logged user must have username and token', async () => {
    let newLoggedUser = Object.assign({}, initialLogged[0]);
    delete newLoggedUser.username;
    await api
      .post('/api/logged')
      .send(newLoggedUser)
      .expect(400);
    newLoggedUser = Object.assign({}, initialLogged[0]);
    delete newLoggedUser.token;
    await api
      .post('/api/logged')
      .send(newLoggedUser)
      .expect(400);
  });

  test('can only store one logged user at a time', async () => {
    const newLoggedUser = initialLogged[0];

    await api
      .post('/api/logged')
      .send(newLoggedUser)
      .expect(201);
    const anotherUser = initialLogged[1];
    await api
      .post('/api/logged')
      .send(anotherUser)
      .expect(400);
  });
});

describe('DELETE /api/logged/', () => {
  beforeEach(async () => {
    await LoggedUser.remove({});
    const loggedObject = new LoggedUser(initialLogged[0]);
    await loggedObject.save();
  });

  test('can remove logged user', async () => {
    await api.delete('/api/logged/').expect(204);
  });

  test('removing unexisting user fails with 404', async () => {
    await LoggedUser.remove({});
    await api.delete('/api/logged/').expect(404);
  });

});
