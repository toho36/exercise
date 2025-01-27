import apiClient from './apiClient';

export const createTenantApi = async (
  name: string,
  password: string,
): Promise<{ apiKey: string; tenant: string }> => {
  try {
    const response = await apiClient.post<{ apiKey: string; name: string }>('/tenants', {
      name,
      password,
    });
    console.log('Tenant created. API Key:', response.data.apiKey);
    return { apiKey: response.data.apiKey, tenant: response.data.name };
  } catch (error: any) {
    console.error('Error creating tenant:', error.response?.data || error.message);
    throw error;
  }
};
