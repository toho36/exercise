import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React from 'react';

export function LoginPage() {
  return (
    <div className="flex justify-center items-start h-screen pt-10">
      <div className="w-96 h-83 p-6 bg-gray-100 rounded-lg shadow-md">
        <form className="space-y-4">
          <h2 className="text-xl font-bold ">Log In</h2>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email:
            </label>
            <InputDefault type="email" placeholder="me@example.com" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password:
            </label>
            <InputDefault type="password" placeholder="********" />
          </div>
          <div className="flex justify-end">
            <ButtonDefault color="blue" text="Log In" />
          </div>
        </form>
      </div>
    </div>
  );
}
