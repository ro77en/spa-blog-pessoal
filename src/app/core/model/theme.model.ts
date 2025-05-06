import { IPost } from './post.model';

export interface ITheme {
  id: number;
  descricao: string;
  posts?: IPost[];
}

export interface ThemeCreate {
  descricao: string;
}
