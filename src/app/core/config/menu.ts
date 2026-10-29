export interface OpcionMenu { etiqueta: string; ruta: string; permiso?: string; icono: string; }
export const MENU: OpcionMenu[] = [
  { etiqueta: 'Inicio', ruta: '/inicio', icono: '⌂' },
  { etiqueta: 'Servicios', ruta: '/servicios', permiso: 'SERVICIO_LEER', icono: '⚙' },
  { etiqueta: 'Vehículos', ruta: '/vehiculos', permiso: 'VEHICULO_LEER', icono: '▣' },
];
