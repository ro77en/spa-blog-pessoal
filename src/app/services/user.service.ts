import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${username}`);
  }
}
