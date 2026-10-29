import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cliente, Vehiculo } from '../../../core/models/autoandes.model';
import { ClienteService } from '../../../core/services/cliente.service';
import { VehiculoService } from '../../../core/services/vehiculo.service';
import { mensajeError } from '../../../core/services/api-error';
import { SiPermisoDirective } from '../../../shared/directives/si-permiso.directive';

@Component({
  standalone: true, selector: 'app-vehiculo-lista',
  imports: [CommonModule, RouterLink, SiPermisoDirective],
  templateUrl: './vehiculo-lista.component.html',
})
export class VehiculoListaComponent implements OnInit {
  private readonly vehicles = inject(VehiculoService);
  private readonly customerService = inject(ClienteService);
  readonly filas = signal<Vehiculo[]>([]);
  readonly clientes = signal<Cliente[]>([]);
  readonly clienteId = signal('');
  readonly cargando = signal(true);
  readonly error = signal('');
  readonly visibles = computed(() => this.filas());
  ngOnInit(): void {
    this.customerService.listar().subscribe({ next: values => this.clientes.set(values), error: err => this.error.set(mensajeError(err)) });
    this.cargar();
  }
  cargar(): void {
    this.cargando.set(true); this.error.set('');
    const id = Number(this.clienteId());
    this.vehicles.listar(id > 0 ? id : null).subscribe({
      next: values => { this.filas.set(values); this.cargando.set(false); },
      error: err => { this.error.set(mensajeError(err)); this.cargando.set(false); },
    });
  }
  cambiarCliente(value: string): void { this.clienteId.set(value); this.cargar(); }
  eliminar(item: Vehiculo): void {
    if (!window.confirm('¿Eliminar el vehículo ' + item.placa + '?')) return;
    this.vehicles.eliminar(item.id).subscribe({
      next: () => this.filas.update(rows => rows.filter(row => row.id !== item.id)),
      error: err => this.error.set(mensajeError(err)),
    });
  }
}
