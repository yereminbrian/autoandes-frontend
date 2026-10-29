import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cliente, Orden, Servicio, Vehiculo } from '../../../core/models/autoandes.model';
import { OrdenService } from '../../../core/services/orden.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { VehiculoService } from '../../../core/services/vehiculo.service';
import { mensajeError } from '../../../core/services/api-error';

@Component({
  standalone: true, selector: 'app-orden-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './orden-form.component.html',
})
export class OrdenFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly orders = inject(OrdenService);
  private readonly vehiclesApi = inject(VehiculoService);
  private readonly servicesApi = inject(ServicioService);
  readonly vehiculos = signal<Vehiculo[]>([]);
  readonly servicios = signal<Servicio[]>([]);
  readonly cargando = signal(true);
  readonly enviando = signal(false);
  readonly error = signal('');
  readonly resultado = signal<Orden | null>(null);
  readonly encabezado = this.fb.nonNullable.group({
    vehiculoId: [0, [Validators.required, Validators.min(1)]],
    kilometraje: [0, [Validators.required, Validators.min(0)]],
  });
  readonly lineas = new FormArray<FormGroup>([]);

  ngOnInit(): void {
    let pendientes = 2;
    const terminado = () => { pendientes--; if (pendientes === 0) this.cargando.set(false); };
    this.vehiclesApi.listar().subscribe({ next: rows => { this.vehiculos.set(rows); terminado(); }, error: err => { this.error.set(mensajeError(err)); terminado(); } });
    this.servicesApi.listar().subscribe({ next: rows => { this.servicios.set(rows.filter(item => item.activo)); terminado(); }, error: err => { this.error.set(mensajeError(err)); terminado(); } });
    this.agregarLinea();
  }

  agregarLinea(): void {
    this.lineas.push(this.fb.nonNullable.group({
      servicioId: [0, [Validators.required, Validators.min(1)]],
      cantidad: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    }));
  }
  quitarLinea(indice: number): void { if (this.lineas.length > 1) this.lineas.removeAt(indice); }
  precio(indice: number): number {
    const id = Number(this.lineas.at(indice).get('servicioId')?.value);
    return this.servicios().find(item => item.id === id)?.precio ?? 0;
  }
  subtotal(indice: number): number {
    const cantidad = Number(this.lineas.at(indice).get('cantidad')?.value || 0);
    return this.precio(indice) * cantidad;
  }
  total(): number { return this.lineas.controls.reduce((suma, _, index) => suma + this.subtotal(index), 0); }
  servicioOcupado(indice: number, servicioId: number): boolean {
    return this.lineas.controls.some((linea, index) => index !== indice && Number(linea.get('servicioId')?.value) === servicioId);
  }
  registrar(): void {
    this.error.set('');
    if (this.encabezado.invalid || this.lineas.length < 1 || this.lineas.length > 10 ||
        this.lineas.controls.some(line => line.invalid) || this.enviando() || this.resultado()) {
      this.encabezado.markAllAsTouched(); this.lineas.markAllAsTouched(); return;
    }
    const request = {
      vehiculoId: this.encabezado.controls.vehiculoId.value,
      kilometraje: this.encabezado.controls.kilometraje.value,
      detalles: this.lineas.controls.map(line => ({
        servicioId: Number(line.get('servicioId')?.value),
        cantidad: Number(line.get('cantidad')?.value),
      })),
    };
    this.enviando.set(true);
    this.orders.registrar(request).subscribe({
      next: response => { this.resultado.set(response); this.enviando.set(false); },
      error: err => { this.error.set(mensajeError(err)); this.enviando.set(false); },
    });
  }
  nueva(): void {
    this.resultado.set(null); this.encabezado.reset({ vehiculoId: 0, kilometraje: 0 });
    while (this.lineas.length) this.lineas.removeAt(0);
    this.agregarLinea();
  }
}
