import type { StateCreator } from 'zustand';

type AuthData = {
  xApiKey: string;
  token: string;
};

type AuthSlice = {
  isAuthenticated: boolean;
  authData: AuthData | null;
  setAuthenticated: (value: boolean) => void;
  setAuthData: (data: AuthData | null) => void; // New function type
};

export const createAuthSlice: StateCreator<AuthSlice, [['zustand/devtools', never]]> = set => ({
  isAuthenticated: false,
  authData: null,
  setAuthenticated: (bool: boolean) => {
    set({ isAuthenticated: bool }, undefined, 'action/setAuthenticated');
  },
  setAuthData: (data: AuthData | null) => {
    // New function implementation
    set({ authData: data }, undefined, 'action/setAuthData');
  },
});
