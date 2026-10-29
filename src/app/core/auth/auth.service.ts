import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, UsuarioActual } from '../models/auth.model';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionService);
  private readonly base = environment.apiUrl + '/auth';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.base + '/login', request).pipe(
      tap(response => this.session.iniciar(request.username, response)),
    );
  }

  actual(): Observable<UsuarioActual> {
    return this.http.get<UsuarioActual>(this.base + '/me');
  }

  logout(): void { this.session.cerrar(); }
}
