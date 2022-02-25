import { backendClient } from './http';

export const createProfile = async (userId, companyId, photoId, name) => {
  try {
    const response = await backendClient.post('/profiles', {
      data: {
        status: 'pending',
        profilePhoto: photoId,
        user: userId,
        company: companyId,
        name: name,
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

export const getProfilesFromCompnay = async (companyId) => {
  try {
    const response = await backendClient.get(`/profiles`, {
      params: {
        'filters[company][id][$eq]': companyId,
        populate: 'profilePhoto',
      },
    });
    return response;
  } catch (error) {
    throw `Get companys failed- ${error}`;
  }
};

export const editProfile = async (profileId, photoId, name) => {
  try {
    const response = await backendClient.put(`/profiles/${profileId}`, {
      data: {
        profilePhoto: photoId,
        name: name,
      },
    });
    return response;
  } catch (error) {
    throw `Changing profile failed - ${error}`;
  }
};

export const changeProfileStatus = async (profileId) => {
  try {
    const response = await backendClient.put(`/profiles/${profileId}`, {
      data: {
        status: 'published',
      },
    });
    return response;
  } catch (error) {
    throw `Changing profile failed - ${error}`;
  }
};

export const deleteProfile = async (profileId) => {
  try {
    const response = await backendClient.delete(`profiles/${profileId}`);
    return response;
  } catch (error) {
    throw `Delete profile failed - ${error}`;
  }
};
