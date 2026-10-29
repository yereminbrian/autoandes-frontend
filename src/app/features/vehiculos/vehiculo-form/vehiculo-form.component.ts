import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';
import { VehiculoService } from '../../../core/services/vehiculo.service';
import { Cliente, VehiculoRequest } from '../../../core/models/autoandes.model';
import { camposError, mensajeError } from '../../../core/services/api-error';

@Component({
  standalone: true, selector: 'app-vehiculo-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './vehiculo-form.component.html',
})
export class VehiculoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(VehiculoService);
  private readonly clientesApi = inject(ClienteService);
  readonly clientes = signal<Cliente[]>([]);
  readonly id = signal<number | null>(null);
  readonly cargando = signal(false);
  readonly guardando = signal(false);
  readonly error = signal('');
  readonly campos = signal<Record<string, string>>({});
  readonly form = this.fb.nonNullable.group({
    placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-[0-9]{3}$/)]],
    marca: ['', [Validators.required, Validators.maxLength(40)]],
    modelo: ['', [Validators.required, Validators.maxLength(40)]],
    anio: [2020, [Validators.required, Validators.min(1990), Validators.max(2027)]],
    clienteId: [0, [Validators.required, Validators.min(1)]],
  });
  ngOnInit(): void {
    this.clientesApi.listar().subscribe({ next: values => this.clientes.set(values), error: err => this.error.set(mensajeError(err)) });
    const raw = this.route.snapshot.paramMap.get('id');
    if (!raw) return;
    const id = Number(raw); this.id.set(id); this.cargando.set(true);
    this.service.obtener(id).subscribe({
      next: value => { this.form.setValue({ placa: value.placa, marca: value.marca, modelo: value.modelo, anio: value.anio, clienteId: value.clienteId }); this.cargando.set(false); },
      error: err => { this.error.set(mensajeError(err)); this.cargando.set(false); },
    });
  }
  guardar(): void {
    this.error.set(''); this.campos.set({});
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const request: VehiculoRequest = this.form.getRawValue();
    this.guardando.set(true);
    const id = this.id();
    const action = id ? this.service.actualizar(id, request) : this.service.crear(request);
    action.subscribe({
      next: () => { this.guardando.set(false); void this.router.navigate(['/vehiculos']); },
      error: err => { this.guardando.set(false); this.error.set(mensajeError(err)); this.campos.set(camposError(err)); },
    });
  }
  campo(nombre: string): string { return this.campos()[nombre] ?? ''; }
}
