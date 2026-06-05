import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar-container">
      
      <div class="side-card top-card">
        <h3 class="brand-title">PYME SP</h3>
        <h2 class="brand-subtitle">Sistema de Remuneraciones</h2>
        <p class="brand-caption">Navegación principal para las pantallas de la plataforma.</p>
      </div>

      <nav class="side-card menu-card">
        <a routerLink="/dashboard" routerLinkActive="active" class="menu-item">Dashboard</a>
        <a routerLink="/empresa" routerLinkActive="active" class="menu-item">Gestión de Empresa</a>
        <a routerLink="/empleados" routerLinkActive="active" class="menu-item">Empleados</a>
        <a routerLink="/liquidaciones" routerLinkActive="active" class="menu-item">Liquidaciones</a>
        <a routerLink="/vacaciones" routerLinkActive="active" class="menu-item">Vacaciones y Permisos</a>
        <a routerLink="/documentos" routerLinkActive="active" class="menu-item">Documentos y Firmas</a>
      </nav>

      <div class="side-card bottom-card">
        <p class="status-title">ESTADO</p>
        <div class="status-indicator">
          <span class="dot green"></span> Formulario activo
        </div>
        <p class="status-caption">Diseño responsive</p>
      </div>

    </aside>
  `,
  styles: [`
    .sidebar-container {
      width: 280px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      height: 100%;
    }

    .side-card {
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
    }

    /* Tarjeta Superior */
    .top-card { padding: 24px 20px; }
    .brand-title { color: #1e3a8a; font-size: 0.85rem; font-weight: 800; margin: 0 0 6px 0; letter-spacing: 1px; }
    .brand-subtitle { font-size: 1.1rem; color: #1e293b; font-weight: 600; margin: 0 0 10px 0; }
    .brand-caption { font-size: 0.8rem; color: #64748b; line-height: 1.4; margin: 0; }

    /* Tarjeta Menú */
    .menu-card { padding: 12px; display: flex; flex-direction: column; gap: 4px; flex: 1; }
    .menu-item {
      text-decoration: none;
      color: #0f172a;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 16px 20px;
      border-radius: 14px;
      transition: background-color 0.2s;
    }
    .menu-item:hover { background-color: #f8fafc; }
    /* El estilo de la pestaña seleccionada según tu imagen */
    .menu-item.active { background-color: #f8fafc; } 

    /* Tarjeta Inferior */
    .bottom-card { padding: 20px; margin-top: auto; }
    .status-title { color: #1d4ed8; font-weight: 800; font-size: 0.75rem; letter-spacing: 1px; margin: 0 0 12px 0; }
    .status-indicator { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.9rem; color: #1e293b; margin-bottom: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot.green { background-color: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2); }
    .status-caption { font-size: 0.85rem; color: #64748b; margin: 0; }
  `]
})
export class AppSidebarComponent {}