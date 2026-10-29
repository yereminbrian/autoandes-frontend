# AutoAndes Web

SPA empresarial Angular para el caso AutoAndes del examen LP2.

## Requisitos y ejecución

- Node.js compatible con Angular 22: 22.22.3+, 24.15+ o 26.0+.
- Instala dependencias desde esta carpeta con npm install.
- Inicia con npm start o ng serve; abre http://localhost:4200.
- El backend debe estar disponible en http://localhost:8080/api/v1 antes de ingresar.

La URL API local está en src/environments/environment.ts. La compilación de producción reemplaza ese archivo por src/environments/environment.production.ts, que usa la ruta relativa /api/v1; configura el servidor o proxy de despliegue para reenviar esa ruta al backend. Si el backend estará en otro dominio, cambia apiUrl en el archivo de producción por su URL HTTPS antes de compilar. No agregues contraseñas ni tokens al código o Git.

## Cuentas locales de demostración

Las cuentas semilla del backend usan admin123, asesor123, jefe123 e inactivo123 (usuario en minúsculas + 123). La cuenta inactiva debe ser rechazada. Cambia estas claves antes de cualquier despliegue.

## Módulos

- Login, sesión en sessionStorage con vencimiento, interceptores Bearer y manejo diferenciado de 401/403.
- Inicio y menú filtrados por permisos del token.
- CRUD de Servicios y Vehículos; la lista de clientes para el formulario de vehículo viene del backend.
- Registro de órdenes con servicios sin repetir, cantidad 1 a 5, precio/total estimados, consulta con filtros, detalle y anulación con motivo.
- Reporte de ingresos por servicio.
- Rutas lazy y guards de sesión/permisos.

La SPA limita botones y rutas para UX. La API debe rechazar en servidor cualquier operación sin el permiso correspondiente.
