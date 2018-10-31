const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const User = require('../models/user');
const { initialUsers, getAllUsers } = require('./test_helper');

describe('GET /api/users', () => {

  beforeAll(async () => {
    await User.remove({});

    const userObjects = initialUsers.map(u => new User(u));
    const promiseArray = userObjects.map(u => u.save());
    await Promise.all(promiseArray);
  });

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('correct number of users listed', async () => {
    const response = await api
      .get('/api/users');
    const actualUsers = await getAllUsers();
    expect(response.body.length).toBe(actualUsers.length);
  });

  test('admin is among users', async () => {
    const response = await api.get('/api/users');
    const usernames = response.body.map(u => {
      return u.username;
    });
    expect(usernames).toContain('admin');
  });

});

describe('POST /api/users',  () => {
  beforeEach(async () => {
    await User.remove({});
    const userObjects = initialUsers.map(u => new User(u));
    const promiseArray = userObjects.map(u => u.save());
    await Promise.all(promiseArray);
  });

  test('Password length equal to 3 letters is ok (201).', async () => {
    const usersBeforeAdd = await getAllUsers();
    const newUser = {
      username: 'johnd',
      name: 'John Doe',
      password: '123',
      adult: true
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const usersAfterAdd = await getAllUsers();
    const found = usersAfterAdd.find((b) => {
      return b.username === newUser.username;
    });
    expect(found.username).toEqual(newUser.username);
    expect(usersBeforeAdd.length).toEqual(usersAfterAdd.length-1);
  });

  test('Password length less than 3 letters returns 400', async () => {
    const usersBeforeAdd = await getAllUsers();
    const newUser = {
      username: 'johnd',
      name: 'John Doe',
      password: 'jd',
      adult: true
    };
    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
    expect(result.body.error).toEqual('password length must be at least 3');
    let usersAfterAdd = await getAllUsers();
    expect(usersBeforeAdd.length).toEqual(usersAfterAdd.length);
  });

  test('Non-unique username returns 400.', async () => {
    const usersBeforeAdd = await getAllUsers();
    const newUser = {
      username: usersBeforeAdd[0].username,
      name: 'John Doe',
      password: 'password',
      adult: true
    };
    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
    expect(result.body.error).toEqual('must be unique username');
    let usersAfterAdd = await getAllUsers();
    expect(usersBeforeAdd.length).toEqual(usersAfterAdd.length);
  });

  test('Adult attribute defaults to true', async () => {
    const newUser = {
      username: 'johnd',
      name: 'John Doe',
      password: 'password'
    };
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(result.body.adult).toEqual(true);
    let usersAfterAdd = await getAllUsers();
    const added = usersAfterAdd.find((u) => {
      return u.username === newUser.username;
    });
    expect(added.adult).toEqual(true);
  });

});

afterAll(() => {
  server.close();
});
