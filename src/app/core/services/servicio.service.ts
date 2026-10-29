import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Servicio, ServicioRequest } from '../models/autoandes.model';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/servicios';
  listar() { return this.http.get<Servicio[]>(this.url); }
  obtener(id: number) { return this.http.get<Servicio>(this.url + '/' + id); }
  crear(request: ServicioRequest) { return this.http.post<Servicio>(this.url, request); }
  actualizar(id: number, request: ServicioRequest) { return this.http.put<void>(this.url + '/' + id, request); }
  eliminar(id: number) { return this.http.delete<void>(this.url + '/' + id); }
  cambiarEstado(id: number, activo: boolean) { return this.http.patch<Servicio>(this.url + '/' + id + '/estado', { activo }); }
}
