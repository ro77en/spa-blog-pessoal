import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../services/storage.service';
import { switchMap, tap } from 'rxjs';

interface AuthUser {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api';
  private jwtHelper = new JwtHelperService();

  currentUser = signal<AuthUser | null>(null);

  setCurrentUser(user: AuthUser) {
    this.currentUser.set(user);
    this.storageService.setItem('currentUser', JSON.stringify(user));
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: { username: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((res) => {
          const decoded = this.jwtHelper.decodeToken(res.token);

          const user: AuthUser = {
            username: decoded.sub,
            token: res.token,
          };

          this.setCurrentUser(user);
          this.router.navigate(['/home']);
        })
      );
  }

  register(userData: {
    username: string;
    password: string;
    profilePicUrl?: string;
  }) {
    return this.http
      .post<void>(`${this.API_URL}/register`, userData)
      .pipe(
        switchMap(() =>
          this.login({
            username: userData.username,
            password: userData.password,
          })
        )
      );
  }

  logout() {
    this.currentUser.set(null);
    this.storageService.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  loadUserFromStorage() {
    const data = this.storageService.getItem('currentUser');
    if (data) {
      this.currentUser.set(JSON.parse(data));
    }
  }

  isLoggedIn(): boolean {
    const user = this.currentUser();

    if (!user || !user.token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(user.token);
  }
}
