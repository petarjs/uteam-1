import { backendClient } from './http';

export const userRegister = async (userName, email, password) => {
  try {
    const response = await backendClient.post('/api/auth/local/register', {
      username: userName,
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    throw `User registration failed - ${error}`;
  }
};
