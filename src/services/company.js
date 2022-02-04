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
export const getCompnay = async (userId) => {
  try {
    const response = await backendClient.get(`/profiles`, {
      params: {
        'filters[user][id][$eq]': userId,
        populate: 'company',
      },
    });
    return response;
  } catch (error) {
    throw `Get company failed- ${error}`;
  }
};

export const getCompanyLogo = async (profileId) => {
  try {
    const response = await backendClient.get('companies', {
      params: {
        'filters[profiles][id][$eq]': profileId,
        populate: 'logo',
      },
    });
    return response;
  } catch (error) {
    throw `Error getCompanyLogo - ${error}`;
  }
};

export const editCompany = async (companyId, companyName, logoId) => {
  try {
    const response = await backendClient.put(`/companies/${companyId}`, {
      data: {
        name: companyName,
        logo: logoId,
      },
    });
    return response;
  } catch (error) {
    throw `Changing company failed - ${error}`;
  }
};
