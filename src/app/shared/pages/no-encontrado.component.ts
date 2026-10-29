import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ standalone: true, imports: [RouterLink], template: '<section class="empty-state"><span class="empty-icon">404</span><h1>Página no encontrada</h1><p>La dirección solicitada no existe.</p><a class="button button-primary" routerLink="/inicio">Volver al inicio</a></section>' })
export class NoEncontradoComponent {}
