import type { StateCreator } from 'zustand';

export interface IArticle {
  articleId: string;
  imageId: string;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  perex: string;
  comments: number;
  imgBlob: string;
}

interface IArticlesSlice {
  articles: IArticle[] | undefined;
  setArticles: (articles: IArticle[]) => void;
}

export const createArticleSlice: StateCreator<
  IArticlesSlice,
  [['zustand/devtools', never]]
> = set => ({
  articles: undefined,
  setArticles: (articles: IArticle[]) => {
    set({ articles: articles }, undefined, 'action/setArticles');
  },
});
