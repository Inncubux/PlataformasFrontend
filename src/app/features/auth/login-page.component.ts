import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
// IMPORTANTE: Asegúrate de tener la ruta correcta hacia tu AuthService
// import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule], // <-- Necesario para que funcione tu loginForm
  template: `
    <main class="auth-shell">
      <section class="auth-card">
        <div class="auth-hero">
          <p class="auth-kicker">Pyme SP</p>
          <h1>Sistema de Remuneraciones</h1>
          <p>
            Accede al panel para gestionar empleados, liquidaciones, vacaciones,
            documentos y la configuración legal de la empresa.
          </p>

          <div class="auth-badges">
            <span>Dashboard</span>
            <span>Empresa</span>
            <span>Empleados</span>
            <span>Documentos</span>
          </div>
        </div>

        <section class="auth-form-card">
          <div class="auth-form-header">
            <h2>Iniciar sesión</h2>
            <p>Ingresa con tu correo y contraseña para continuar.</p>
          </div>

          <div class="auth-form" [formGroup]="loginForm">
            <label>
              <span>Correo electrónico</span>
              <input formControlName="email" readonly />
            </label>

            <label>
              <span>Contraseña</span>
              <input formControlName="password" type="password" readonly />
            </label>

            <button class="auth-button" (click)="submit()">Entrar al sistema</button>
          </div>
        </section>
      </section>
    </main>
  `,
  styles: [`
    /* ¡AQUÍ ESTABA EL ERROR! Todo el CSS debe estar DENTRO de estas comillas */
    
    .auth-shell {
      display: block;
      min-height: 100vh;
      padding: 18px;
      border-radius: 28px;
      background: rgba(255, 255, 255, 0.76);
      border: 1px solid rgba(148, 163, 184, 0.18);
      box-shadow: 0 28px 80px rgba(15, 23, 42, 0.12);
      backdrop-filter: blur(16px);
    }

    .auth-hero {
      border-radius: 24px;
      padding: 42px;
      color: #fff;
      background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 56%, #2563eb 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 540px;
    }

    .auth-kicker {
      margin: 0 0 8px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 0.78rem;
      color: #bfdbfe;
      font-weight: 800;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3.4rem);
      line-height: 1;
      max-width: 12ch;
    }

    .auth-hero p {
      margin: 16px 0 0;
      max-width: 52ch;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);
    }

    .auth-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 28px;
    }

    .auth-badges span {
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.14);
      font-weight: 700;
    }

    .auth-form-card {
      border-radius: 24px;
      border: 1px solid rgba(148, 163, 184, 0.18);
      box-shadow: none;
      background: #fff;
    }

    .auth-form-header h2,
    .auth-form-header p {
      margin: 0;
    }

    .auth-form-header p {
      color: #64748b;
      margin-top: 6px;
      line-height: 1.5;
    }

    .auth-form {
      display: grid;
      gap: 8px;
      margin-top: 20px;
    }

    .auth-button {
      width: 100%;
      height: 46px;
      border-radius: 14px;
      margin-top: 8px;
      cursor: pointer;
    }

    @media (max-width: 900px) {
      .auth-card {
        grid-template-columns: 1fr;
      }

      .auth-hero {
        min-height: 0;
      }
    }
  `] /* <-- ¡Aquí recién se cierra el string de estilos! */
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService); // Te marcará error si no importas AuthService arriba
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['administrador@pyme.cl', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(4)]],
  });

  submit(): void {
    const { email, password } = this.loginForm.getRawValue();

    // Cuando esto sea exitoso, tu router te llevará al shell protegido de la Pyme
    if (this.authService.login(email, password)) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}