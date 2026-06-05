import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzIconModule],
  template: `
    <header class="navbar-light">
      
      <div class="nav-left">
        <h1 class="greeting">Hola, Administrador 👋</h1>
        <p class="date">Jueves, 16 de Abril 2026</p>
      </div>

      <div class="nav-right">
        <div class="search-box">
          <span nz-icon nzType="search"></span>
          <input type="text" placeholder="Buscar empleado o documento..." />
        </div>

        <button class="icon-btn"><span nz-icon nzType="bell"></span></button>

        <div class="user-profile">
          <div class="avatar">PA</div>
          <div class="user-info">
            <span class="user-name">Pyme Admin</span>
            <span class="user-role">Recursos Humanos</span>
          </div>
          <button class="logout-icon" routerLink="/login" title="Cerrar sesión">
            <span nz-icon nzType="logout"></span>
          </button>
        </div>
      </div>

    </header>
  `,
  styles: [`
    .navbar-light {
      background-color: #ffffff;
      padding: 16px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    }

    .nav-left .greeting { margin: 0; font-size: 1.4rem; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
    .nav-left .date { margin: 2px 0 0; font-size: 0.9rem; color: #64748b; font-weight: 500; }

    .nav-right { display: flex; align-items: center; gap: 20px; }

    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f1f5f9;
      padding: 10px 16px;
      border-radius: 999px;
      width: 260px;
    }
    .search-box span { color: #64748b; }
    .search-box input { border: none; background: transparent; outline: none; width: 100%; color: #0f172a; font-size: 0.9rem; }
    .search-box input::placeholder { color: #94a3b8; }

    .icon-btn {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #475569;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .icon-btn:hover { background: #f1f5f9; color: #0f172a; }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 12px;
      border-left: 1px solid #e2e8f0;
    }

    .avatar { background: #e0e7ff; color: #2563eb; width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; font-weight: 700; font-size: 1rem; }
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-weight: 700; font-size: 0.9rem; color: #0f172a; }
    .user-role { font-size: 0.75rem; color: #64748b; }

    .logout-icon { background: transparent; border: none; color: #94a3b8; cursor: pointer; padding: 4px; transition: color 0.2s; }
    .logout-icon:hover { color: #ef4444; }

    @media (max-width: 900px) {
      .search-box { display: none; }
      .navbar-light { padding: 16px; }
    }
  `]
})
export class AppNavbarComponent {}