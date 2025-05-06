import { Post } from './post.model';

export interface Theme {
  id: number;
  descricao: string;
  posts?: Post[];
}

export interface ThemeCreate {
  descricao: string;
}
