import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice';
// import { createRecipesTabSlice } from '@/store/slices/recipesTabSlice';
import { createBearSlice } from '@/store/slices/bearSlice';
import type { TypesFromFunctions } from '@/utils/typesFromFunctions';

type Slices = TypesFromFunctions<
  [
    typeof createBearSlice,
    // typeof createRecipesTabSlice,
    typeof createAuthSlice,
  ]
>;

export const useStore = create<Slices>()(
  devtools(
    persist(
      (...args) => ({
        ...createBearSlice(...args),
        // ...createRecipesTabSlice(...args),
        ...createAuthSlice(...args),
      }),
      {
        name: 'Persisted Global store',
        partialize: state => ({ authData: state.authData }),
      },
    ),
    {
      name: 'Global store',
    },
  ),
);
