import { Injectable } from '@angular/core';
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

  editUserInfo(
    userId: number,
    data: { username: string; password: string; profilePicUrl: string }
  ) {
    return this.http.put<void>(`${this.API_URL}/${userId}`, data);
  }

  deleteUser(userId: number) {
    return this.http.delete<void>(`${this.API_URL}/${userId}`);
  }
}
