import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { SessionService } from '../../core/auth/session.service';
import { MENU } from '../../core/config/menu';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  private readonly auth = inject(AuthService);
  private readonly session = inject(SessionService);
  readonly nombre = this.session.nombre;
  readonly menu = computed(() => MENU.filter(item => !item.permiso || this.session.tienePermiso(item.permiso)));
  salir(): void { this.auth.logout(); }
}
