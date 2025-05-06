import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

export const errorMiddleware: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const snackbarService = inject(SnackbarService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro desconhecido';

      if (error.error instanceof ErrorEvent) {
        // Erro no cliente
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        // Erro no servidor
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Requisição inválida';
            break;
          case 401:
            errorMessage = 'Não autorizado. Faça login novamente.';
            authService.logout();
            setTimeout(() => router.navigate(['/auth/login']), 0);
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

      snackbarService.error(errorMessage);
      return throwError(() => error);
    })
  );
};
