import { backendClient } from './http';

export const registerCompany = async (company) => {
  try {
    const response = await backendClient.post('/companies', {
      data: {
        name: company,
      },
    });
    return response;
  } catch (error) {
    throw `Company creation failed - ${error}`;
  }
};
