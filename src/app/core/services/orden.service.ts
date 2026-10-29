import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Orden, OrdenRequest } from '../models/autoandes.model';

export interface FiltroOrden { placa?: string; estado?: string; desde?: string; hasta?: string; }

@Injectable({ providedIn: 'root' })
export class OrdenService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/ordenes';
  listar(filtro: FiltroOrden) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(filtro)) if (value) params = params.set(key, value);
    return this.http.get<Orden[]>(this.url, { params });
  }
  obtener(id: number) { return this.http.get<Orden>(this.url + '/' + id); }
  registrar(request: OrdenRequest) { return this.http.post<Orden>(this.url, request); }
  anular(id: number, motivo: string) { return this.http.patch<Orden>(this.url + '/' + id + '/anular', { motivo }); }
}
