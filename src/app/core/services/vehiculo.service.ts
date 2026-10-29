import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Vehiculo, VehiculoRequest } from '../models/autoandes.model';

@Injectable({ providedIn: 'root' })
export class VehiculoService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/vehiculos';
  listar(clienteId?: number | null) {
    const params = clienteId ? new HttpParams().set('clienteId', clienteId) : undefined;
    return this.http.get<Vehiculo[]>(this.url, { params });
  }
  obtener(id: number) { return this.http.get<Vehiculo>(this.url + '/' + id); }
  crear(request: VehiculoRequest) { return this.http.post<Vehiculo>(this.url, request); }
  actualizar(id: number, request: VehiculoRequest) { return this.http.put<void>(this.url + '/' + id, request); }
  eliminar(id: number) { return this.http.delete<void>(this.url + '/' + id); }
}
