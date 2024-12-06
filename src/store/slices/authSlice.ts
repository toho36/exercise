import type { StateCreator } from 'zustand';

interface IAuthData {
  xApiKey: string;
  token: string;
  tenant: string;
}

interface IAuthSlice {
  isAuthenticated: boolean;
  authData: IAuthData | null;
  setAuthenticated: (value: boolean) => void;
  setAuthData: (data: IAuthData | null) => void; // New function type
}

export const createAuthSlice: StateCreator<IAuthSlice, [['zustand/devtools', never]]> = set => ({
  isAuthenticated: false,
  authData: null,
  setAuthenticated: (bool: boolean) => {
    set({ isAuthenticated: bool }, undefined, 'action/setAuthenticated');
  },
  setAuthData: (data: IAuthData | null) => {
    // New function implementation
    set({ authData: data }, undefined, 'action/setAuthData');
  },
});
