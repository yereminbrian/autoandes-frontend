import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const esLogin = request.url.endsWith('/auth/login');
  return next(request).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 401 && !esLogin) {
      const returnUrl = router.url;
      auth.logout();
      void router.navigate(['/login'], { queryParams: { returnUrl } });
    }
    return throwError(() => error);
  }));
};
