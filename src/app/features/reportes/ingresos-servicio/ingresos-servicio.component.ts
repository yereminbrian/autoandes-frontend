import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteIngreso } from '../../../core/models/autoandes.model';
import { ReporteService } from '../../../core/services/reporte.service';
import { mensajeError } from '../../../core/services/api-error';

@Component({
  standalone: true, selector: 'app-ingresos-servicio', imports: [CommonModule], templateUrl: './ingresos-servicio.component.html',
})
export class IngresosServicioComponent {
  private readonly service = inject(ReporteService);
  private readonly hoy = new Date();
  readonly desde = signal(new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1).toISOString().slice(0, 10));
  readonly hasta = signal(this.hoy.toISOString().slice(0, 10));
  readonly filas = signal<ReporteIngreso[]>([]);
  readonly cargando = signal(false);
  readonly consultado = signal(false);
  readonly error = signal('');
  total(): number { return this.filas().reduce((sum, row) => sum + row.importeTotal, 0); }
  consultar(): void {
    this.cargando.set(true); this.error.set(''); this.consultado.set(true);
    this.service.consultar(this.desde(), this.hasta()).subscribe({
      next: rows => { this.filas.set(rows); this.cargando.set(false); },
      error: err => { this.error.set(mensajeError(err)); this.cargando.set(false); },
    });
  }
}
