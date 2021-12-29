import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/local', {
      identifier: email,
      password,
    });
    return response.data;
  } catch (error) {
    throw `Unable to authenticate: ${error}`;
  }
};
