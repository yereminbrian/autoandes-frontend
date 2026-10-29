export interface Cliente { id: number; documento: string; nombres: string; telefono: string | null; }
export interface Servicio { id: number; codigo: string; nombre: string; precio: number; duracionMin: number; activo: boolean; }
export interface ServicioRequest { codigo: string; nombre: string; precio: number; duracionMin: number; }
export interface Vehiculo { id: number; placa: string; marca: string; modelo: string; anio: number; clienteId: number; clienteNombre: string; }
export interface VehiculoRequest { placa: string; marca: string; modelo: string; anio: number; clienteId: number; }
export interface DetalleOrdenRequest { servicioId: number; cantidad: number; }
export interface OrdenRequest { vehiculoId: number; kilometraje: number; detalles: DetalleOrdenRequest[]; }
export interface DetalleOrden { servicioId: number; codigoServicio: string; servicio: string; cantidad: number; precioUnitario: number; subtotal: number; }
export interface Orden {
  id: number; numero: string; fecha: string; vehiculoId: number; placa: string; cliente: string;
  kilometraje: number; estado: 'REGISTRADA' | 'ANULADA'; total: number; usuarioRegistro: string;
  motivoAnulacion: string | null; detalles: DetalleOrden[];
}
export interface ReporteIngreso { codigo: string; servicio: string; cantidadTotal: number; importeTotal: number; }
export interface ErrorApi { timestamp?: string; status?: number; error?: string; mensaje?: string; ruta?: string; campos?: Record<string, string>; }
