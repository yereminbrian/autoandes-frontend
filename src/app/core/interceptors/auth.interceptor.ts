import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SessionService } from '../auth/session.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(SessionService).token();
  const esApiAutoAndes = request.url.startsWith(environment.apiUrl);
  if (!token || !esApiAutoAndes) return next(request);
  return next(request.clone({ setHeaders: { Authorization: 'Bearer ' + token } }));
};
