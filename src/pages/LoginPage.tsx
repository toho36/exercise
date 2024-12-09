import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/store';

export const createTenant = async (
  name: string,
  password: string,
): Promise<{ apiKey: string; tenant: string }> => {
  try {
    const response = await axios.post<{ apiKey: string; name: string }>(`${API_BASE_URL}/tenants`, {
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

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';
/**
 * LoginPage Component
 * This component represents the login page where users can input their email and password to log in.
 * The process first creates a tenant using the email and password, then uses the received API key to log in
 * and retrieve an access token. Upon successful login, the authentication data is stored in the application's state
 * and the user is redirected to a different page.
 *
 * @returns {JSX.Element} The LoginPage component.
 */
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setAuthData = useStore(state => state.setAuthData);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // First, create a tenant to get the API key and name
      const { apiKey, tenant } = await createTenant(email, password);

      // Then, log in using the API key to get the access token
      const response = await axios.post<{ access_token: string }>(
        `${API_BASE_URL}/login`,
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
    <div className="flex justify-center items-start h-screen pt-10">
      <div className="w-96 h-83 p-6 bg-gray-100 rounded-lg shadow-md">
        <form className="space-y-4" onSubmit={handleLogin}>
          <h2 className="text-xl font-bold ">Log In</h2>
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
