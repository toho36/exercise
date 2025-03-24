import { test, expect } from 'vitest';
import { createTenantApi } from '@/api/createTenantApi';

test('createTenant', async () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';

  // Call the createTenant function
  const result = await createTenantApi(mockEmail, mockPassword);
  // Check if axios.post was called with the correct parameters

  // Check if the result's tenant is as expected
  expect(result.tenant).toEqual(mockEmail);
});
