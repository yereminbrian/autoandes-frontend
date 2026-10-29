import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../auth/session.service';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(SessionService).autenticado() ? router.parseUrl('/inicio') : true;
};
