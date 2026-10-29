export interface LoginRequest { username: string; password: string; }
export interface LoginResponse {
  token: string;
  tipo: 'Bearer';
  expiraEnSegundos: number;
  nombreCompleto: string;
  roles: string[];
  permisos: string[];
}
export interface Sesion extends LoginResponse { username: string; venceEn: number; }
export interface UsuarioActual {
  username: string;
  nombreCompleto: string;
  roles: string[];
  permisos: string[];
}
