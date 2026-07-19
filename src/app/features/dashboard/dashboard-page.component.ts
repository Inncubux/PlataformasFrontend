import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero-row">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Resumen general del sistema · jueves, 16 de abril de 2026</p>
      </div>
    </section>

    <section class="stats-grid">
      @for (card of cards; track card.title) {
        <article class="stat-card">
          <div class="stat-info">
            <p>{{ card.title }}</p>
            <h2>{{ card.value }}</h2>
          </div>
          <div [className]="'stat-icon-wrapper accent-' + card.accent">
            <span class="stat-icon">{{ card.icon }}</span>
          </div>
        </article>
      }
    </section>

    <section class="panels-grid">
      @if (bars.length > 0 && growth.length > 0) {
        <article class="panel card-large">
          <div class="panel-header">
            <h3>Gasto en Remuneraciones (Millones $)</h3>
          </div>
          <div class="bar-chart">
            @for (bar of bars; track bar.label) {
              <div class="bar-group">
                <div class="bar-track">
                  <span class="bar" [style.height.%]="bar.height"></span>
                </div>
                <small>{{ bar.label }}</small>
              </div>
            }
          </div>
        </article>

        <article class="panel card-large">
          <div class="panel-header">
            <h3>Crecimiento de Empleados</h3>
          </div>
          <div class="growth-chart">
            <svg viewBox="0 0 600 240" role="img" aria-label="Crecimiento de empleados por mes">
              <defs>
                <linearGradient id="growthFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#bfdbfe" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#eff6ff" stop-opacity="0.2" />
                </linearGradient>
              </defs>

              <path class="growth-area" [attr.d]="growthAreaPath"></path>
              <path class="growth-line" [attr.d]="growthLinePath"></path>

              @for (point of growthPlot; track point.label) {
                <g>
                  <line class="growth-guide" [attr.x1]="point.x" y1="26" [attr.x2]="point.x" y2="182"></line>
                  <circle class="growth-dot" [attr.cx]="point.x" [attr.cy]="point.y" r="6"></circle>
                  <text class="growth-value" [attr.x]="point.x" [attr.y]="point.y - 16">{{ point.value }}</text>
                </g>
              }
            </svg>

            <div class="growth-labels">
              @for (point of growthPlot; track point.label) {
                <span>{{ point.label }}</span>
              }
            </div>
          </div>
        </article>
      } @else {
        <article class="panel card-large empty-state-panel">
          <div class="panel-header">
            <h3>Gráficos sin información</h3>
          </div>
          <p class="empty-state-text">
            No hay datos simulados para los gráficos todavía. Agrega una fuente de datos o vuelve a cargar el panel.
          </p>
        </article>
      }
    </section>

    <section class="panels-grid bottom-grid">
      <article class="panel">
        <div class="panel-header">
          <h3>Alertas Recientes</h3>
        </div>
        <div class="alerts-container">
          <div class="alert alert-warning">
            <span class="alert-icon">⚠️</span>
            <p>3 contratos vencen en los próximos 15 días</p>
          </div>
          <div class="alert alert-info">
            <span class="alert-icon">ℹ️</span>
            <p>Nuevos parámetros de Previred disponibles para abril</p>
          </div>
          <div class="alert alert-success">
            <span class="alert-icon">✅</span>
            <p>LRE de marzo generado exitosamente</p>
          </div>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <h3>Tareas Pendientes</h3>
        </div>
        <ul class="tasks-list">
          <li>
            <div class="task-info">
              <span class="indicator red"></span>
              <span>Generar liquidación de Juan Pérez</span>
            </div>
            <time>16 Abr</time>
          </li>
          <li>
            <div class="task-info">
              <span class="indicator yellow"></span>
              <span>Revisar solicitud de vacaciones - María González</span>
            </div>
            <time>18 Abr</time>
          </li>
          <li>
            <div class="task-info">
              <span class="indicator yellow"></span>
              <span>Actualizar datos previsionales</span>
            </div>
            <time>20 Abr</time>
          </li>
          <li>
            <div class="task-info">
              <span class="indicator red"></span>
              <span>Firmar contrato de nuevo empleado</span>
            </div>
            <time>17 Abr</time>
          </li>
        </ul>
      </article>
    </section>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-bottom: 24px;
    }

    /* Tipografía General */
    h1, h2, h3, p { margin: 0; }
    
    .hero-row { margin-bottom: 8px; }
    .page-title { font-size: 1.8rem; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
    .page-subtitle { margin-top: 4px; color: #64748b; font-size: 0.95rem; }

    /* Grillas */
    .stats-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    .panels-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    }

    /* Tarjetas Base */
    .panel, .stat-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 24px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    .stat-card:hover, .panel:hover {
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
      transform: translateY(-2px);
    }

    /* Diseño de Tarjetas KPI */
    .stat-card {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .stat-info p { font-size: 0.9rem; color: #64748b; font-weight: 600; margin-bottom: 8px; }
    .stat-info h2 { font-size: 2rem; font-weight: 800; color: #0f172a; line-height: 1; }

    .stat-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-size: 1.5rem;
    }

    /* Acentos de color (Fondo claro + Texto oscuro) */
    .accent-blue { background: #eff6ff; color: #2563eb; }
    .accent-orange { background: #fff7ed; color: #ea580c; }
    .accent-green { background: #f0fdf4; color: #16a34a; }
    .accent-purple { background: #faf5ff; color: #9333ea; }

    /* Paneles Grandes */
    .panel-header { margin-bottom: 24px; }
    .panel-header h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; }

    /* Gráfico de Barras CSS */
    .bar-chart {
      height: 200px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 20px;
    }

    .bar-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .bar-track {
      width: 40px;
      height: 150px;
      background: #f1f5f9;
      border-radius: 8px;
      display: flex;
      align-items: flex-end;
      overflow: hidden;
    }

    .bar {
      width: 100%;
      background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 8px;
      transition: height 1s ease-out;
    }
    
    .bar-group:hover .bar { background: linear-gradient(180deg, #60a5fa 0%, #2563eb 100%); }
    .bar-group small { color: #64748b; font-weight: 600; font-size: 0.85rem; }

    /* Gráfico de crecimiento */
    .growth-chart {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .growth-chart svg {
      width: 100%;
      height: 240px;
      overflow: visible;
    }

    .growth-area {
      fill: url(#growthFill);
    }

    .growth-line {
      fill: none;
      stroke: #2563eb;
      stroke-width: 4;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .growth-guide {
      stroke: #dbeafe;
      stroke-width: 1.5;
      stroke-dasharray: 4 6;
    }

    .growth-dot {
      fill: #ffffff;
      stroke: #2563eb;
      stroke-width: 4;
    }

    .growth-value {
      fill: #0f172a;
      font-size: 14px;
      font-weight: 700;
      text-anchor: middle;
    }

    .growth-labels {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 12px;
    }

    .growth-labels span {
      text-align: center;
      color: #64748b;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .empty-state-panel {
      min-height: 240px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .empty-state-text {
      color: #64748b;
      line-height: 1.6;
      max-width: 520px;
    }

    /* Alertas */
    .alerts-container { display: flex; flex-direction: column; gap: 12px; }
    
    .alert {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 500;
    }

    .alert-icon { font-size: 1.2rem; }
    .alert-warning { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
    .alert-info { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
    .alert-success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }

    /* Lista de Tareas */
    .tasks-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
    }

    .tasks-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .tasks-list li:last-child { border-bottom: none; padding-bottom: 0; }

    .task-info {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #334155;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .indicator { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .indicator.red { background: #ef4444; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2); }
    .indicator.yellow { background: #f59e0b; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2); }

    .tasks-list time { color: #94a3b8; font-size: 0.85rem; font-weight: 600; }

    @media (max-width: 768px) {
      .panels-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardPageComponent {
  readonly cards = [
    { title: 'Total Empleados', value: '24', icon: '👥', accent: 'blue' },
    { title: 'Liquidaciones Pendientes', value: '3', icon: '🧾', accent: 'orange' },
    { title: 'Solicitudes de Vacaciones', value: '5', icon: '📅', accent: 'green' },
    { title: 'Gasto Mensual', value: '$12.5M', icon: '📈', accent: 'purple' },
  ];

  readonly bars = [
    { label: 'Oct', height: 45 },
    { label: 'Nov', height: 55 },
    { label: 'Dic', height: 80 },
    { label: 'Ene', height: 65 },
    { label: 'Feb', height: 75 },
    { label: 'Mar', height: 90 },
  ];

  readonly growth = [
    { label: 'Oct', value: 16 },
    { label: 'Nov', value: 18 },
    { label: 'Dic', value: 21 },
    { label: 'Ene', value: 20 },
    { label: 'Feb', value: 24 },
    { label: 'Mar', value: 27 },
  ];

  private readonly chartWidth = 600;
  private readonly chartHeight = 240;
  private readonly chartPaddingX = 40;
  private readonly chartPaddingY = 32;

  get growthPlot() {
    const maxValue = Math.max(...this.growth.map((point) => point.value));
    const plotWidth = this.chartWidth - this.chartPaddingX * 2;
    const plotHeight = this.chartHeight - this.chartPaddingY * 2;
    const step = this.growth.length > 1 ? plotWidth / (this.growth.length - 1) : 0;

    return this.growth.map((point, index) => {
      const x = this.chartPaddingX + step * index;
      const y = this.chartPaddingY + (1 - point.value / maxValue) * plotHeight;

      return { ...point, x, y };
    });
  }

  get growthLinePath(): string {
    return this.growthPlot.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  }

  get growthAreaPath(): string {
    const baseLine = this.chartHeight - this.chartPaddingY;
    const points = this.growthPlot.map((point) => `${point.x} ${point.y}`).join(' ');

    return `M ${this.chartPaddingX} ${baseLine} L ${points} L ${this.chartWidth - this.chartPaddingX} ${baseLine} Z`;
  }
}