import { backendClient } from './http';
export const getUserInfo = async () => {
  try {
    const response = await backendClient.get(`/users/me`);
    return response;
  } catch (error) {
    throw `Fetching user information failed - ${error}`;
  }
};
