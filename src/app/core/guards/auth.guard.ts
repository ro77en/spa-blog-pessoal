import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbarService = inject(SnackbarService);

  if (authService.isLoggedIn()) {
    return true;
  }

  snackbarService.info('Você precisa estar logado para acessar esta página');
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
