import { Routes } from '@angular/router';
export const REPORTES_ROUTES: Routes = [
  { path: '', data: { permiso: 'REPORTE_VER' }, loadComponent: () => import('./ingresos-servicio/ingresos-servicio.component').then(m => m.IngresosServicioComponent) },
];
