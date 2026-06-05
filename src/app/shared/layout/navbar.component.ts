import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header class="navbar-card">
      
      <div class="nav-left">
        <div class="avatar">P</div>
        <div class="nav-text">
          <span class="nav-brand">PYME SP</span>
          <h1 class="nav-title">Panel de administración</h1>
        </div>
      </div>

      <div class="nav-right">
        <span class="status-badge">En línea</span>
        <button class="logout-btn" routerLink="/login">Cerrar sesión</button>
      </div>

    </header>
  `,
  styles: [`
    .navbar-card {
      /* El degradado azul oscuro exacto de tu diseño */
      background: linear-gradient(90deg, #0f172a 0%, #1e3a8a 100%);
      border-radius: 20px;
      padding: 16px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
      flex-shrink: 0; /* Evita que se aplaste si el contenido crece */
    }

    .nav-left { display: flex; align-items: center; gap: 16px; }
    
    .avatar {
      background: rgba(255, 255, 255, 0.15);
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      font-size: 1.4rem;
      font-weight: 800;
    }

    .nav-text { display: flex; flex-direction: column; }
    .nav-brand { font-size: 0.75rem; color: #93c5fd; font-weight: 700; letter-spacing: 1.5px; }
    .nav-title { margin: 0; font-size: 1.3rem; font-weight: 600; }

    .nav-right { display: flex; align-items: center; gap: 16px; }
    
    .status-badge {
      background: rgba(255, 255, 255, 0.1);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      backdrop-filter: blur(4px);
    }

    .logout-btn {
      background: #ffffff;
      color: #0f172a;
      border: none;
      padding: 10px 20px;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
    }
    
    .logout-btn:hover { background-color: #f1f5f9; transform: translateY(-1px); }
  `]
})
export class AppNavbarComponent {}