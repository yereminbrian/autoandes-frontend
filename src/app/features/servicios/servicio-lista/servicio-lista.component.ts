import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Servicio } from '../../../core/models/autoandes.model';
import { ServicioService } from '../../../core/services/servicio.service';
import { mensajeError } from '../../../core/services/api-error';
import { SiPermisoDirective } from '../../../shared/directives/si-permiso.directive';

@Component({
  standalone: true, selector: 'app-servicio-lista', imports: [CommonModule, RouterLink, SiPermisoDirective],
  templateUrl: './servicio-lista.component.html',
})
export class ServicioListaComponent implements OnInit {
  private readonly service = inject(ServicioService);
  readonly filas = signal<Servicio[]>([]);
  readonly filtro = signal('');
  readonly cargando = signal(true);
  readonly error = signal('');
  readonly filtrados = computed(() => {
    const query = this.filtro().trim().toLocaleLowerCase('es');
    return this.filas().filter(item => !query || (item.codigo + ' ' + item.nombre).toLocaleLowerCase('es').includes(query));
  });
  ngOnInit(): void { this.cargar(); }
  cargar(): void {
    this.cargando.set(true); this.error.set('');
    this.service.listar().subscribe({
      next: data => { this.filas.set(data); this.cargando.set(false); },
      error: err => { this.error.set(mensajeError(err)); this.cargando.set(false); },
    });
  }
  cambiarEstado(item: Servicio): void {
    const activo = !item.activo;
    if (!window.confirm(activo ? '¿Deseas reactivar este servicio?' : '¿Deseas dar de baja este servicio?')) return;
    this.service.cambiarEstado(item.id, activo).subscribe({
      next: actualizado => this.filas.update(rows => rows.map(row => row.id === actualizado.id ? actualizado : row)),
      error: err => this.error.set(mensajeError(err)),
    });
  }
}
