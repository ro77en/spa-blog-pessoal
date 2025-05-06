import { ITheme } from './theme.model';
import { IUser } from './user.model';

export interface IPost {
  id: number;
  titulo: string;
  texto: string;
  data: Date;
  usuario: IUser;
  tema: ITheme;
}

export interface PostCreate {
  titulo: string;
  texto: string;
  temaId: number;
}
