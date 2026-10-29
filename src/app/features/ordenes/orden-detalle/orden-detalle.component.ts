import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Orden } from '../../../core/models/autoandes.model';
import { OrdenService } from '../../../core/services/orden.service';
import { mensajeError } from '../../../core/services/api-error';
import { SiPermisoDirective } from '../../../shared/directives/si-permiso.directive';

@Component({
  standalone: true, selector: 'app-orden-detalle',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SiPermisoDirective],
  templateUrl: './orden-detalle.component.html',
})
export class OrdenDetalleComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(OrdenService);
  readonly orden = signal<Orden | null>(null);
  readonly cargando = signal(true);
  readonly error = signal('');
  readonly guardando = signal(false);
  readonly motivo = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)] });
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obtener(id).subscribe({
      next: value => { this.orden.set(value); this.cargando.set(false); },
      error: err => { this.error.set(mensajeError(err)); this.cargando.set(false); },
    });
  }
  anular(): void {
    const item = this.orden();
    if (!item || item.estado !== 'REGISTRADA' || this.motivo.invalid || this.guardando()) { this.motivo.markAsTouched(); return; }
    if (!window.confirm('¿Anular la orden ' + item.numero + '? Esta operación no se puede revertir.')) return;
    this.guardando.set(true);
    this.service.anular(item.id, this.motivo.value.trim()).subscribe({
      next: updated => { this.orden.set(updated); this.guardando.set(false); this.error.set(''); },
      error: err => { this.error.set(mensajeError(err)); this.guardando.set(false); },
    });
  }
}
