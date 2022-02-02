import { backendClient } from './http';

export const login = async (email, password) => {
  try {
    const response = await backendClient.post('/auth/local', {
      identifier: email,
      password,
    });
    return response;
  } catch (error) {
    throw `Unable to authenticate: ${error}`;
  }
};

export const passwordChange = async (userId, newPassword) => {
  try {
    const response = await backendClient.put(`/users/${userId}`, {
      password: newPassword,
    });
    return response;
  } catch (error) {
    throw `Unable to change password ${error}`;
  }
};
