import backendClient from './http';

export const createProfile = async (userId, companyId, photoId) => {
  try {
    const response = await backendClient.post('/api/profiles', {
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
