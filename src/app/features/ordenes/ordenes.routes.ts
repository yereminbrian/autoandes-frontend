import { Routes } from '@angular/router';
export const ORDENES_ROUTES: Routes = [
  { path: '', data: { permiso: 'ORDEN_LEER' }, loadComponent: () => import('./orden-lista/orden-lista.component').then(m => m.OrdenListaComponent) },
  { path: 'nueva', data: { permiso: 'ORDEN_REGISTRAR' }, loadComponent: () => import('./orden-form/orden-form.component').then(m => m.OrdenFormComponent) },
  { path: ':id', data: { permiso: 'ORDEN_LEER' }, loadComponent: () => import('./orden-detalle/orden-detalle.component').then(m => m.OrdenDetalleComponent) },
];
