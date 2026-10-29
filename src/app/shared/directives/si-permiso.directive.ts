import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { SessionService } from '../../core/auth/session.service';

@Directive({ selector: '[appSiPermiso]', standalone: true })
export class SiPermisoDirective {
  private readonly session = inject(SessionService);
  private readonly template = inject(TemplateRef<unknown>);
  private readonly container = inject(ViewContainerRef);
  private permisoActual = '';
  private visible = false;

  @Input() set appSiPermiso(permiso: string) {
    this.permisoActual = permiso;
    this.actualizar();
  }

  constructor() {
    effect(() => {
      this.session.sesion();
      this.actualizar();
    });
  }

  private actualizar(): void {
    const debeMostrar = !!this.permisoActual && this.session.tienePermiso(this.permisoActual);
    if (debeMostrar && !this.visible) {
      this.container.createEmbeddedView(this.template);
      this.visible = true;
    } else if (!debeMostrar && this.visible) {
      this.container.clear();
      this.visible = false;
    }
  }
}
