import { Post } from './post.model';

export interface User {
  id: number;
  usuario: string;
  foto?: string;
  senha?: string;
  token: string | null;
  posts?: Post[];
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
