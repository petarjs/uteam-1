import backendClient from './http';

export const userRegister = async (userName, email, password) => {
  try {
    const response = await backendClient.post(
      '/api/auth/local/register',
      {
        username: userName,
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw `Unable to register: ${error}`;
  }
};
