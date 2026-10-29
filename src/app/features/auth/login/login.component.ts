import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly enviando = signal(false);
  readonly error = signal('');
  readonly form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ingresar(): void {
    this.error.set('');
    if (this.form.invalid || this.enviando()) { this.form.markAllAsTouched(); return; }
    this.enviando.set(true);
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        const destino = this.route.snapshot.queryParamMap.get('returnUrl');
        const returnUrl = destino && destino.startsWith('/') && !destino.startsWith('//') && !destino.includes(String.fromCharCode(92))
          ? destino : '/inicio';
        this.enviando.set(false);
        void this.router.navigateByUrl(returnUrl);
      },
      error: () => { this.enviando.set(false); this.error.set('Usuario o contraseña inválidos.'); },
    });
  }
}
