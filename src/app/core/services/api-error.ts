import { HttpErrorResponse } from '@angular/common/http';
import { ErrorApi } from '../models/autoandes.model';

export function mensajeError(error: unknown, fallback = 'No se pudo completar la operación.'): string {
  if (error instanceof HttpErrorResponse) {
    const api = error.error as ErrorApi | null;
    if (api?.mensaje) return api.mensaje;
  }
  return fallback;
}

export function camposError(error: unknown): Record<string, string> {
  if (error instanceof HttpErrorResponse) {
    const api = error.error as ErrorApi | null;
    return api?.campos ?? {};
  }
  return {};
}
