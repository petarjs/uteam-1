import backendClient from './http';

export const uploadPhoto = async (formData) => {
  try {
    const response = await backendClient.post('/api/upload', formData);
    return response;
  } catch (error) {
    throw `Photo upload failed - ${error}`;
  }
};
