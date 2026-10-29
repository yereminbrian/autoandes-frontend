import { Routes } from '@angular/router';
export const SERVICIOS_ROUTES: Routes = [
  { path: '', data: { permiso: 'SERVICIO_LEER' }, loadComponent: () => import('./servicio-lista/servicio-lista.component').then(m => m.ServicioListaComponent) },
  { path: 'nuevo', data: { permiso: 'SERVICIO_ESCRIBIR' }, loadComponent: () => import('./servicio-form/servicio-form.component').then(m => m.ServicioFormComponent) },
  { path: ':id/editar', data: { permiso: 'SERVICIO_ESCRIBIR' }, loadComponent: () => import('./servicio-form/servicio-form.component').then(m => m.ServicioFormComponent) },
];
