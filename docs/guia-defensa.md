# Guía de defensa — AutoAndes Web

Repasa el código con las preguntas del examen y explica cada línea asistida por IA.

- Pantalla → API: cada recurso usa un servicio HTTP en app/core/services.
- Sesión: core/auth/session.service.ts guarda token y vencimiento en sessionStorage.
- Header Authorization: core/interceptors/auth.interceptor.ts lo agrega solo a la URL configurada en environment.
- Expulsión ante 401 y conservación de sesión ante 403: core/interceptors/error.interceptor.ts solo reacciona al 401.
- Rutas por permiso: core/guards/permission.guard.ts revisa data.permiso; las rutas de cada feature declaran su permiso.
- Menú y acciones visibles: core/config/menu.ts y shared/directives/si-permiso.directive.ts.
- Orden: orden-form.component.ts calcula una estimación; orden.service.ts envía solo vehículo, kilometraje, servicio y cantidad. La API toma precios vigentes y hace el total definitivo.
- Para probar con asesor y jefe, el menú cambia al iniciar sesión y una ruta escrita manualmente termina en Acceso denegado si el token carece del permiso.
- Código de estado: un 401 cierra la sesión; un 403 deja al usuario autenticado.

El contrato de error comparte el nombre campos. Los componentes de servicios y vehículos presentan esos mensajes debajo de los controles; el resto de errores muestra mensaje del backend.
