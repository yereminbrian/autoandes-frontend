import { Routes } from '@angular/router';
export const VEHICULOS_ROUTES: Routes = [
  { path: '', data: { permiso: 'VEHICULO_LEER' }, loadComponent: () => import('./vehiculo-lista/vehiculo-lista.component').then(m => m.VehiculoListaComponent) },
  { path: 'nuevo', data: { permiso: 'VEHICULO_ESCRIBIR' }, loadComponent: () => import('./vehiculo-form/vehiculo-form.component').then(m => m.VehiculoFormComponent) },
  { path: ':id/editar', data: { permiso: 'VEHICULO_ESCRIBIR' }, loadComponent: () => import('./vehiculo-form/vehiculo-form.component').then(m => m.VehiculoFormComponent) },
];
