import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../core/auth/session.service';
import { SiPermisoDirective } from '../../shared/directives/si-permiso.directive';

@Component({
  standalone: true, selector: 'app-inicio', imports: [RouterLink, SiPermisoDirective],
  templateUrl: './inicio.component.html',
})
export class InicioComponent { readonly nombre = inject(SessionService).nombre; }
