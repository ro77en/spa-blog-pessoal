import { Theme } from './theme.model';
import { User } from './user.model';

export interface Post {
  id: number;
  titulo: string;
  texto: string;
  data: Date;
  usuario: User;
  tema: Theme;
}

export interface PostCreate {
  titulo: string;
  texto: string;
  temaId: number;
}
