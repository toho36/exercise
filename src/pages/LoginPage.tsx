import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/store';
import { createTenantApi } from '@/api/createTenantApi';
import apiClient, { setAuthHeaders } from '@/api/apiClient';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setAuthData = useStore(state => state.setAuthData);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // First, create a tenant to get the API key and name
      const { apiKey, tenant } = await createTenantApi(email, password);

      // Then, log in using the API key to get the access token
      const response = await apiClient.post<{ access_token: string }>(
        '/login',
        {
          username: email,
          password,
        },
        {
          headers: {
            'X-API-KEY': apiKey,
          },
        },
      );

      // Set authentication headers globally
      setAuthHeaders(response.data.access_token, apiKey);

      // Store auth data in the global state
      setAuthData({
        xApiKey: apiKey,
        token: response.data.access_token,
        tenant,
      });

      // Redirect to /my-articles on successful login
      navigate('/my-articles');
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex h-screen items-start justify-center pt-10">
      <div className="h-83 w-96 rounded-lg bg-gray-100 p-6 shadow-md">
        <form className="space-y-4" onSubmit={handleLogin}>
          <h2 className="text-xl font-bold">Log In</h2>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Username:
            </label>
            <InputDefault
              type="text"
              placeholder="Username or email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password:
            </label>
            <InputDefault
              type="password"
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <ButtonDefault color="blue" text="Log In" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
