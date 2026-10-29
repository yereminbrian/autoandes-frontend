import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ standalone: true, imports: [RouterLink], template: '<section class="empty-state"><span class="empty-icon">403</span><h1>Acceso denegado</h1><p>Tu usuario no tiene permiso para abrir esta sección.</p><a class="button button-primary" routerLink="/inicio">Volver al inicio</a></section>' })
export class AccesoDenegadoComponent {}
