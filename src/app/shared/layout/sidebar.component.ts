import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, NzIconModule],
  template: `
    <aside class="sidebar-dark">
      
      <div class="brand-zone">
        <div class="logo-box">SP</div>
        <div class="brand-text">
          <h2 class="brand-title">PYME SP</h2>
          <p class="brand-subtitle">Remuneraciones</p>
        </div>
      </div>

      <nav class="nav-menu">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span nz-icon nzType="appstore" nzTheme="outline"></span> Dashboard
        </a>
        <a routerLink="/empresa" routerLinkActive="active" class="nav-item">
          <span nz-icon nzType="shop" nzTheme="outline"></span> Gestión de Empresa
        </a>
        <a routerLink="/empleados" routerLinkActive="active" class="nav-item">
          <span nz-icon nzType="team" nzTheme="outline"></span> Empleados
        </a>
        <a routerLink="/liquidaciones" routerLinkActive="active" class="nav-item">
          <span nz-icon nzType="file-text" nzTheme="outline"></span> Liquidaciones
        </a>
        <a routerLink="/vacaciones" routerLinkActive="active" class="nav-item">
          <span nz-icon nzType="calendar" nzTheme="outline"></span> Vacaciones y Permisos
        </a>
        <a routerLink="/documentos" routerLinkActive="active" class="nav-item">
          <span nz-icon nzType="folder" nzTheme="outline"></span> Documentos y Firmas
        </a>
      </nav>

      <div class="sidebar-footer">
        <div class="status-box">
          <span class="dot"></span>
          <span>Sistema en línea</span>
        </div>
      </div>

    </aside>
  `,
  styles: [`
    .sidebar-dark {
      width: 260px;
      background-color: #0f172a; /* Azul oscuro elegante */
      color: #cbd5e1;
      display: flex;
      flex-direction: column;
      height: 100%;
      border-right: 1px solid #1e293b;
      flex-shrink: 0;
    }

    /* Zona de Marca */
    .brand-zone {
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid #1e293b;
    }

    .logo-box {
      width: 40px;
      height: 40px;
      background: #2563eb;
      color: white;
      border-radius: 10px;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 1.1rem;
    }

    .brand-title { color: #ffffff; margin: 0; font-size: 1.05rem; font-weight: 700; letter-spacing: 0.5px; }
    .brand-subtitle { margin: 0; font-size: 0.75rem; color: #94a3b8; }

    /* Navegación */
    .nav-menu {
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: #94a3b8;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: 10px;
      transition: all 0.2s;
    }

    .nav-item span { font-size: 1.1rem; }

    .nav-item:hover {
      background-color: #1e293b;
      color: #ffffff;
    }

    /* Estado Activo (Pestaña seleccionada) */
    .nav-item.active {
      background-color: #2563eb;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    /* Footer del Sidebar */
    .sidebar-footer { padding: 24px; border-top: 1px solid #1e293b; }
    .status-box {
      background: #1e293b;
      padding: 10px 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #e2e8f0;
    }
    .dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2); }
  `]
})
export class AppSidebarComponent {}