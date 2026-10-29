import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  {
    path: '', canActivate: [authGuard], canActivateChild: [permissionGuard],
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', loadComponent: () => import('./features/inicio/inicio.component').then(m => m.InicioComponent) },
      { path: 'servicios', loadChildren: () => import('./features/servicios/servicios.routes').then(m => m.SERVICIOS_ROUTES) },
      { path: 'vehiculos', loadChildren: () => import('./features/vehiculos/vehiculos.routes').then(m => m.VEHICULOS_ROUTES) },
      { path: 'ordenes', loadChildren: () => import('./features/ordenes/ordenes.routes').then(m => m.ORDENES_ROUTES) },
      { path: 'reportes/ingresos-por-servicio', data: { permiso: 'REPORTE_VER' }, loadChildren: () => import('./features/reportes/reportes.routes').then(m => m.REPORTES_ROUTES) },
      { path: 'acceso-denegado', loadComponent: () => import('./shared/pages/acceso-denegado.component').then(m => m.AccesoDenegadoComponent) },
    ],
  },
  { path: '**', loadComponent: () => import('./shared/pages/no-encontrado.component').then(m => m.NoEncontradoComponent) },
];
