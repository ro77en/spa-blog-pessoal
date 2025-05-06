import { IPost } from './post.model';

export interface IUser {
  id: number;
  usuario: string;
  foto?: string;
  senha?: string;
  token?: string;
  posts?: IPost[];
}

export interface UserLogin {
  usuario: string;
  senha: string;
}

export interface UserRegister {
  nome: string;
  usuario: string;
  senha: string;
  foto?: string;
}
