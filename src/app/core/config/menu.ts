export interface OpcionMenu { etiqueta: string; ruta: string; permiso?: string; icono: string; }
export const MENU: OpcionMenu[] = [
  { etiqueta: 'Inicio', ruta: '/inicio', icono: '⌂' },
  { etiqueta: 'Servicios', ruta: '/servicios', permiso: 'SERVICIO_LEER', icono: '⚙' },
  { etiqueta: 'Vehículos', ruta: '/vehiculos', permiso: 'VEHICULO_LEER', icono: '▣' },
  { etiqueta: 'Órdenes', ruta: '/ordenes', permiso: 'ORDEN_LEER', icono: '▤' },
  { etiqueta: 'Ingresos por servicio', ruta: '/reportes/ingresos-por-servicio', permiso: 'REPORTE_VER', icono: '▥' },
];
