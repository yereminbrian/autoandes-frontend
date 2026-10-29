import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServicioRequest } from '../../../core/models/autoandes.model';
import { ServicioService } from '../../../core/services/servicio.service';
import { camposError, mensajeError } from '../../../core/services/api-error';

@Component({
  standalone: true, selector: 'app-servicio-form', imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './servicio-form.component.html',
})
export class ServicioFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ServicioService);
  readonly id = signal<number | null>(null);
  readonly cargando = signal(false);
  readonly guardando = signal(false);
  readonly error = signal('');
  readonly campos = signal<Record<string, string>>({});
  readonly form = this.fb.nonNullable.group({
    codigo: ['', [Validators.required, Validators.pattern(/^SRV-[0-9]{3}$/)]],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    duracionMin: [30, [Validators.required, Validators.min(15), Validators.max(480)]],
  });
  ngOnInit(): void {
    const raw = this.route.snapshot.paramMap.get('id');
    if (!raw) return;
    const id = Number(raw); this.id.set(id); this.cargando.set(true);
    this.service.obtener(id).subscribe({
      next: value => { this.form.setValue({ codigo: value.codigo, nombre: value.nombre, precio: value.precio, duracionMin: value.duracionMin }); this.cargando.set(false); },
      error: err => { this.error.set(mensajeError(err)); this.cargando.set(false); },
    });
  }
  guardar(): void {
    this.error.set(''); this.campos.set({});
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const request: ServicioRequest = this.form.getRawValue();
    this.guardando.set(true);
    const id = this.id();
    const action = id ? this.service.actualizar(id, request) : this.service.crear(request);
    action.subscribe({
      next: () => { this.guardando.set(false); void this.router.navigate(['/servicios']); },
      error: err => { this.guardando.set(false); this.error.set(mensajeError(err)); this.campos.set(camposError(err)); },
    });
  }
  campo(nombre: string): string { return this.campos()[nombre] ?? ''; }
}
