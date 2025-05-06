import { IPost } from './post.model';

export interface Theme {
  id: number;
  descricao: string;
  posts?: IPost[];
}

export interface ThemeCreate {
  descricao: string;
}
