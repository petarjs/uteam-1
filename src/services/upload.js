import { backendClient } from './http';

export const uploadPhoto = async (formData) => {
  try {
    const response = await backendClient.post('/upload', formData);
    return response;
  } catch (error) {
    throw `Photo upload failed - ${error}`;
  }
};

export const getPhoto = async (photoId) => {
  try {
    const response = await backendClient.get(`/upload/files/${photoId}`);
    return response;
  } catch (error) {
    throw `Get photo failed - ${error}`;
  }
};
