// import type { StateCreator } from 'zustand';
// import type { Recipe } from '@/types/Recipe';

// type RecipesTabSlice = {
//   visibleRecipes: number;
//   recipes: Recipe[] | null;
//   setVisibleRecipes: (value: number) => void;
//   setRecipes: (value: Recipe[]) => void;
// };

// export const createRecipesTabSlice: StateCreator<
//   RecipesTabSlice,
//   [['zustand/devtools', never]]
// > = set => ({
//   visibleRecipes: 10,
//   recipes: null,
//   setVisibleRecipes: (value: number) => {
//     set({ visibleRecipes: value }, undefined, 'action/setVisibleRecipes');
//   },
//   setRecipes: (recipes: Recipe[]) => {
//     set({ recipes }, undefined, 'action/setRecipes');
//   },
// });
