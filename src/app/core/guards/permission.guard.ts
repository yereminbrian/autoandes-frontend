import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { SessionService } from '../auth/session.service';

export const permissionGuard: CanActivateChildFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);
  if (!session.autenticado()) return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  const permiso = route.data['permiso'] as string | undefined;
  return !permiso || session.tienePermiso(permiso) ? true : router.parseUrl('/acceso-denegado');
};
