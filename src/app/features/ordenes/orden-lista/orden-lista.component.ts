import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Orden } from '../../../core/models/autoandes.model';
import { OrdenService } from '../../../core/services/orden.service';
import { mensajeError } from '../../../core/services/api-error';
import { SiPermisoDirective } from '../../../shared/directives/si-permiso.directive';

@Component({
  standalone: true, selector: 'app-orden-lista', imports: [CommonModule, RouterLink, SiPermisoDirective],
  templateUrl: './orden-lista.component.html',
})
export class OrdenListaComponent {
  private readonly service = inject(OrdenService);
  readonly filas = signal<Orden[]>([]);
  readonly cargando = signal(false);
  readonly error = signal('');
  readonly placa = signal('');
  readonly estado = signal('');
  readonly desde = signal('');
  readonly hasta = signal('');
  constructor() { this.buscar(); }
  buscar(): void {
    this.cargando.set(true); this.error.set('');
    this.service.listar({ placa: this.placa(), estado: this.estado(), desde: this.desde(), hasta: this.hasta() }).subscribe({
      next: rows => { this.filas.set(rows); this.cargando.set(false); },
      error: err => { this.error.set(mensajeError(err)); this.cargando.set(false); },
    });
  }
}
