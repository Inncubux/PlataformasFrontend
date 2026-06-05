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
    <main class="floating-layout">
      <div class="layout-grid">
        <app-sidebar></app-sidebar>

        <div class="main-column">
          <app-navbar></app-navbar>
          
          <div class="content-scroll-area">
            <router-outlet></router-outlet>
            <app-footer></app-footer> 
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      background-color: #f0f2f5; /* El fondo gris claro de tus capturas */
      font-family: system-ui, -apple-system, sans-serif;
    }

    .floating-layout {
      height: 100%;
      padding: 16px 24px;
      box-sizing: border-box;
    }

    .layout-grid {
      display: flex;
      gap: 24px;
      height: 100%;
      max-width: 1600px;
      margin: 0 auto;
    }

    .main-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow: hidden; /* Evita que la pantalla completa haga scroll */
    }

    .content-scroll-area {
      flex: 1;
      overflow-y: auto; /* El scroll solo ocurre en tu dashboard/formularios */
      padding-right: 8px; /* Espacio para la barra de scroll */
    }

    /* Ocultar barra de scroll para un look más limpio (opcional) */
    .content-scroll-area::-webkit-scrollbar { width: 6px; }
    .content-scroll-area::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  `]
})
export class AppShellComponent {}