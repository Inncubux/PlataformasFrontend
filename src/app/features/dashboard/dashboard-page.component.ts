import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero-row">
      <div>
        <h1>Dashboard</h1>
        <p>Resumen general del sistema · jueves, 16 de abril de 2026</p>
      </div>
    </section>

    <section class="stats-grid">
      @for (card of cards; track card.title) {
        <article class="stat-card" [className]="'stat-card accent-' + card.accent">
          <div>
            <p>{{ card.title }}</p>
            <h2>{{ card.value }}</h2>
          </div>
          <span class="stat-icon">{{ card.icon }}</span>
        </article>
      }
    </section>

    <section class="panels-grid">
      <article class="panel card-large">
        <h3>Gasto en Remuneraciones (Millones $)</h3>
        <div class="bar-chart">
          @for (bar of bars; track bar.label) {
            <div class="bar-group">
              <span class="bar" [style.height.%]="bar.height"></span>
              <small>{{ bar.label }}</small>
            </div>
          }
        </div>
      </article>

      <article class="panel card-large">
        <h3>Crecimiento de Empleados</h3>
        <div class="line-chart">
          @for (point of growth; track point.label) {
            <div class="line-point">
              <span class="dot"></span>
              <small>{{ point.label }}</small>
            </div>
          }
        </div>
      </article>
    </section>

    <section class="panels-grid bottom-grid">
      <article class="panel">
        <h3>Alertas Recientes</h3>
        <div class="alert success">3 contratos vencen en los próximos 15 días</div>
        <div class="alert info">Nuevos parámetros de Previred disponibles para abril</div>
        <div class="alert positive">LRE de marzo generado exitosamente</div>
      </article>

      <article class="panel">
        <h3>Tareas Pendientes</h3>
        <ul class="tasks-list">
          <li><span class="dot red"></span>Generar liquidación de Juan Pérez <time>16 Abr</time></li>
          <li><span class="dot yellow"></span>Revisar solicitud de vacaciones - María González <time>18 Abr</time></li>
          <li><span class="dot yellow"></span>Actualizar datos previsionales <time>20 Abr</time></li>
          <li><span class="dot red"></span>Firmar contrato de nuevo empleado <time>17 Abr</time></li>
        </ul>
      </article>
    </section>
  `,
  styles: [`
    :host {
      display: grid;
      gap: 18px;
    }

    .hero-row h1,
    .panel h3,
    .stat-card h2,
    .stat-card p {
      margin: 0;
    }

    .hero-row p {
      margin: 6px 0 0;
      color: #64748b;
    }

    .stats-grid,
    .panels-grid {
      display: grid;
      gap: 14px;
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .panels-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .panel,
    .stat-card {
      border-radius: 20px;
      background: #fff;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 12px 34px rgba(15, 23, 42, 0.08);
      padding: 18px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 94px;
    }

    .stat-card p {
      font-size: 0.85rem;
      color: #64748b;
    }

    .stat-card h2 {
      font-size: 1.75rem;
      margin-top: 6px;
    }

    .stat-icon {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 14px;
      color: #fff;
      font-size: 1.25rem;
      font-weight: 700;
    }

    .accent-blue .stat-icon { background: #3b82f6; }
    .accent-orange .stat-icon { background: #f97316; }
    .accent-green .stat-icon { background: #22c55e; }
    .accent-purple .stat-icon { background: #a855f7; }

    .card-large h3 {
      margin-bottom: 14px;
    }

    .bar-chart {
      height: 220px;
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      align-items: end;
      gap: 12px;
      padding: 8px 4px 0;
    }

    .bar-group {
      display: grid;
      gap: 6px;
      justify-items: center;
    }

    .bar {
      width: 100%;
      max-width: 52px;
      border-radius: 12px 12px 6px 6px;
      background: linear-gradient(180deg, #60a5fa 0%, #2563eb 100%);
      box-shadow: 0 10px 20px rgba(37, 99, 235, 0.18);
    }

    .line-chart {
      height: 220px;
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      align-items: end;
      gap: 12px;
      padding: 8px 4px 0;
    }

    .line-point {
      display: grid;
      justify-items: center;
      gap: 10px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: #10b981;
      box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.14);
    }

    .bottom-grid {
      grid-template-columns: 1fr 1fr;
    }

    .alert {
      padding: 14px 16px;
      border-radius: 14px;
      margin-top: 12px;
      border: 1px solid transparent;
      font-size: 0.92rem;
    }

    .alert.success { background: #fff7ed; border-color: #fdba74; }
    .alert.info { background: #eff6ff; border-color: #bfdbfe; }
    .alert.positive { background: #f0fdf4; border-color: #bbf7d0; }

    .tasks-list {
      list-style: none;
      padding: 0;
      margin: 8px 0 0;
      display: grid;
      gap: 12px;
    }

    .tasks-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.18);
    }

    .tasks-list time {
      color: #94a3b8;
      font-size: 0.85rem;
    }

    .dot.red,
    .dot.yellow {
      width: 8px;
      height: 8px;
      box-shadow: none;
      flex: 0 0 auto;
    }

    .dot.red { background: #ef4444; }
    .dot.yellow { background: #f59e0b; }

    @media (max-width: 1100px) {
      .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .panels-grid,
      .bottom-grid {
        grid-template-columns: 1fr;
      }
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
    { label: 'Oct', height: 58 },
    { label: 'Nov', height: 62 },
    { label: 'Dic', height: 68 },
    { label: 'Ene', height: 64 },
    { label: 'Feb', height: 70 },
    { label: 'Mar', height: 74 },
  ];

  readonly growth = [
    { label: 'Oct' },
    { label: 'Nov' },
    { label: 'Dic' },
    { label: 'Ene' },
    { label: 'Feb' },
    { label: 'Mar' },
  ];
}
