import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = error.error?.message || 'Requisição inválida';
              break;
            case 401:
              errorMessage = 'Não autorizado. Faça login novamente.';
              this.authService.logout();
              this.router.navigate(['/auth/login']);
              break;
            case 403:
              errorMessage = 'Acesso proibido';
              break;
            case 404:
              errorMessage = 'Recurso não encontrado';
              break;
            case 500:
              errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
              break;
            default:
              errorMessage = `Erro ${error.status}: ${
                error.error?.message || error.statusText
              }`;
          }
        }

        this.snackbarService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
