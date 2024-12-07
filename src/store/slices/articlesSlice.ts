import type { StateCreator } from 'zustand';

export interface IArticles {
  articleId: string;
  imageId?: string;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  perex: string;
  comments: number;
  imgBlob?: string;
}

interface IArticlesSlice {
  articles: IArticles[] | undefined;
  setArticles: (articles: IArticles[]) => void;
}

export const createArticleSlice: StateCreator<
  IArticlesSlice,
  [['zustand/devtools', never]]
> = set => ({
  articles: undefined,
  setArticles: (articles: IArticles[]) => {
    set({ articles: articles }, undefined, 'action/setArticles');
  },
});
