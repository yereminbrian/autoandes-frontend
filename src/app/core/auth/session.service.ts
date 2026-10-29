import { computed, Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse, Sesion } from '../models/auth.model';

const STORAGE_KEY = 'autoandes.sesion';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly router = inject(Router);
  private readonly estado = signal<Sesion | null>(this.leer());
  readonly sesion = this.estado.asReadonly();
  readonly autenticado = computed(() => {
    const value = this.estado();
    return !!value && value.venceEn > Date.now();
  });
  readonly nombre = computed(() => this.estado()?.nombreCompleto ?? '');

  constructor() {
    window.setInterval(() => {
      const actual = this.estado();
      if (actual && actual.venceEn <= Date.now()) {
        const returnUrl = this.router.url;
        this.cerrar();
        if (!returnUrl.startsWith('/login')) void this.router.navigate(['/login'], { queryParams: { returnUrl } });
      }
    }, 1000);
  }

  iniciar(username: string, respuesta: LoginResponse): void {
    const sesion: Sesion = {
      ...respuesta,
      username,
      venceEn: Date.now() + respuesta.expiraEnSegundos * 1000,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sesion));
    this.estado.set(sesion);
  }

  tienePermiso(permiso: string): boolean {
    return this.estado()?.permisos.includes(permiso) ?? false;
  }

  token(): string | null {
    const value = this.estado();
    return value && value.venceEn > Date.now() ? value.token : null;
  }

  cerrar(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    this.estado.set(null);
  }

  private leer(): Sesion | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const value = JSON.parse(raw) as Sesion;
      if (value.venceEn > Date.now()) return value;
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    } catch {
      return null;
    }
  }
}
