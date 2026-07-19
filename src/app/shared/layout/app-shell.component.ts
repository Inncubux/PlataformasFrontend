import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from './footer.component';
import { AppNavbarComponent } from './navbar.component';
import { AppSidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, AppNavbarComponent, AppSidebarComponent, AppFooterComponent],
  template: `
    <main class="admin-layout">
      <app-sidebar></app-sidebar>

      <div class="main-wrapper">
        <app-navbar></app-navbar>
        
        <div class="content-scroll-area">
          <div class="page-container">
            <router-outlet></router-outlet>
          </div>
          <app-footer></app-footer> 
        </div>
      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .admin-layout {
      display: flex;
      height: 100%;
      background-color: #f1f5f9; /* Fondo gris claro del área de trabajo */
      overflow: hidden;
    }

    .main-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0; /* Evita que el flex-child rompa el layout si el contenido es ancho */
    }

    .content-scroll-area {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .page-container {
      padding: 24px 32px;
      flex: 1;
    }

    /* Scrollbar sutil */
    .content-scroll-area::-webkit-scrollbar { width: 8px; }
    .content-scroll-area::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
  `]
})
export class AppShellComponent {}