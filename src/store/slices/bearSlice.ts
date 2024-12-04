import type { StateCreator } from 'zustand';

type BearSlice = {
  bears: number;
  addBear: () => void;
};

export const createBearSlice: StateCreator<BearSlice, [['zustand/devtools', never]]> = set => ({
  bears: 0,
  addBear: () => {
    set(state => ({ bears: state.bears + 1 }), undefined, 'jungle:bear/addBear');
  },
});
