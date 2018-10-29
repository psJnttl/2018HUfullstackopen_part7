import axios from 'axios';

const login = async (username, password) => {
  const body = {
    username: username,
    password: password
  };
  const response = await axios.post('/api/login', body);
  return response.data;
};

export default { login };
