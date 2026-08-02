import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <main class="auth-shell">
      <div class="auth-card">
        
        <!-- MITAD IZQUIERDA: Hero Azul -->
        <div class="auth-hero">
          <div>
            <p class="auth-kicker">Pyme SP</p>
            <h1 class="hero-title">Sistema de Remuneraciones</h1>
            <p class="hero-desc">
              Accede al panel centralizado para gestionar contratos, liquidaciones de sueldo, 
              vacaciones y la configuración legal de tu empresa. Prueba Github Actions
            </p>
          </div>

          <div class="auth-badges">
            <span>📊 Dashboard</span>
            <span>🏢 Empresa</span>
            <span>👥 Empleados</span>
            <span>🧾 Liquidaciones</span>
          </div>
        </div>

        <!-- MITAD DERECHA: Formulario Blanco -->
        <section class="auth-form-container">
          <div class="auth-form-header">
            <h2>Iniciar sesión</h2>
            <p>Ingresa con las credenciales de administrador para continuar.</p>
          </div>

          <form class="auth-form" [formGroup]="loginForm" (ngSubmit)="submit()">
            
            <div class="input-group">
              <label for="email">Correo electrónico</label>
              <input 
                id="email"
                type="email" 
                formControlName="email" 
                placeholder="administrador@pyme.cl" />
            </div>

            <div class="input-group">
              <label for="password">Contraseña</label>
              <input 
                id="password"
                type="password" 
                formControlName="password" 
                placeholder="••••••••" />
            </div>

            <button type="submit" class="auth-button" [disabled]="loginForm.invalid">
              Entrar al sistema
            </button>
            
          </form>
        </section>

      </div>
    </main>
  `,
  styles: [`
    /* Contenedor principal para centrar la tarjeta en la pantalla */
    .auth-shell {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
      background-color: #f0f2f5; /* Mismo fondo gris claro de tu shell general */
    }

    /* La gran tarjeta dividida en 2 columnas */
    .auth-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      background: #ffffff;
      border-radius: 32px;
      padding: 24px;
      width: 100%;
      max-width: 1100px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
    }

    /* --- LADO IZQUIERDO (AZUL) --- */
    .auth-hero {
      border-radius: 24px;
      padding: 48px;
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 500px;
    }

    .auth-kicker {
      margin: 0 0 16px;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 0.85rem;
      color: #93c5fd;
      font-weight: 800;
    }

    .hero-title {
      margin: 0;
      color: #ffffff !important; /* Forzamos el color blanco */
      font-size: clamp(2.5rem, 4vw, 3.5rem);
      line-height: 1.1;
      font-weight: 800;
      letter-spacing: -1px;
    }

    .hero-desc {
      margin: 24px 0 0;
      font-size: 1.05rem;
      line-height: 1.6;
      color: #e2e8f0;
      max-width: 90%;
    }

    .auth-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 40px;
    }

    .auth-badges span {
      padding: 8px 16px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      font-weight: 600;
      font-size: 0.9rem;
      color: #ffffff;
    }

    /* --- LADO DERECHO (FORMULARIO) --- */
    .auth-form-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 32px 48px 32px 16px;
    }

    .auth-form-header h2 {
      margin: 0;
      font-size: 2rem;
      color: #0f172a;
      font-weight: 800;
    }

    .auth-form-header p {
      color: #64748b;
      margin: 8px 0 32px;
      font-size: 1rem;
    }

    .auth-form {
      display: grid;
      gap: 24px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-group label {
      font-size: 0.9rem;
      font-weight: 700;
      color: #334155;
    }

    /* Estilos premium para los inputs */
    .auth-form input {
      width: 100%;
      padding: 14px 16px;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      background: #f8fafc;
      transition: all 0.2s ease;
      box-sizing: border-box;
      color: #0f172a;
    }

    .auth-form input:focus {
      outline: none;
      border-color: #3b82f6;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    }

    /* Botón principal */
    .auth-button {
      width: 100%;
      padding: 16px;
      border-radius: 12px;
      margin-top: 8px;
      cursor: pointer;
      background: #0f172a;
      color: white;
      border: none;
      font-weight: 700;
      font-size: 1.05rem;
      transition: all 0.2s;
    }

    .auth-button:hover:not(:disabled) {
      background: #1e293b;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(15, 23, 42, 0.15);
    }

    .auth-button:disabled {
      background: #94a3b8;
      cursor: not-allowed;
      opacity: 0.7;
    }

    /* Responsividad para móviles */
    @media (max-width: 992px) {
      .auth-card {
        grid-template-columns: 1fr;
        padding: 16px;
      }
      
      .auth-form-container {
        padding: 24px 16px;
      }
      
      .auth-hero {
        min-height: 400px;
        padding: 32px;
      }
    }
  `]
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['administrador@pyme.cl', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(4)]],
  });

  submit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();

    if (this.authService.login(email, password)) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}