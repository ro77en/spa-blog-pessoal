import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserLogin, UserRegister } from '../../model/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  login(userLogin: UserLogin): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/logar`, userLogin).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userRegister: UserRegister): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/cadastrar`, userRegister);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/atualizar`, user).pipe(
      tap((updatedUser) => {
        const storedUser = this.getUser();
        if (storedUser && storedUser.id === updatedUser.id) {
          const userWithToken = { ...updatedUser, token: storedUser.token };
          localStorage.setItem('user', JSON.stringify(userWithToken));
          this.currentUserSubject.next(userWithToken);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    const user = this.getUser();
    return user ? user.token : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private loadUser(): void {
    const user = this.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }
}
