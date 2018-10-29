import axios from 'axios';

const baseUrl = '/api/logged';

const getLoggedUser = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setLoggedUser = async (user) => {
  try {
    const response = await axios.post(baseUrl, user,);
    return response.data;
  } catch (error) {
    console.log('setLoggedUser, error: ', error);
  }
};

const delLoggedUser = async () => {
  try {
    const response = await axios.delete(baseUrl);
    return response;
  } catch (error) {
    console.log('delLoggedUser, error: ', error);
  }
};

export default { getLoggedUser, setLoggedUser, delLoggedUser };
