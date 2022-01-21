import { backendClient } from './http';

export const createProfile = async (userId, companyId, photoId) => {
  try {
    const response = await backendClient.post('/profiles', {
      data: {
        profilePhoto: photoId,
        user: userId,
        company: companyId,
      },
    });
    return response;
  } catch (error) {
    throw `Profile creation failed - ${error}`;
  }
};

export const getProfile = async (userId) => {
  try {
    const response = await backendClient.get('/profiles/', {
      params: {
        'filters[user][id][$eq]': userId,
        populate: 'profilePhoto',
      },
    });
    return response;
  } catch (error) {
    throw `Getting profile failed - ${error}`;
  }
};
