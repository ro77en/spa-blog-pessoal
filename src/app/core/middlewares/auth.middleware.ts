import { HttpInterceptorFn } from '@angular/common/http';

export const authMiddleware: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({ setHeaders: { Authorization: 'Bearer token' } });
  return next(cloned);
};
