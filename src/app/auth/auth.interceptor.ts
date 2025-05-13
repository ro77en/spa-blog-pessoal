import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const storedUser = this.storageService.getItem('currentUser');
    let token = null;

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        token = user.token;
      } catch (e) {
        console.error('Erro ao ler o token', e);
      }
    }

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401 || e.status === 403) {
          this.authService.logout();
        }
        return throwError(() => e);
      })
    );
  }
}
