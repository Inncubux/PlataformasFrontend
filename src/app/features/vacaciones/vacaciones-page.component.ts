import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vacaciones-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <h1>Vacaciones y Permisos</h1>
        <p>Gestión de solicitudes y control de días disponibles</p>
      </div>
      <button class="primary">+ Nueva Solicitud</button>
    </section>

    <section class="summary-grid">
      <article class="summary-card"><span>Solicitudes Totales</span><strong>4</strong></article>
      <article class="summary-card"><span>Aprobadas</span><strong class="green">1</strong></article>
      <article class="summary-card"><span>Pendientes</span><strong class="orange">2</strong></article>
      <article class="summary-card"><span>Rechazadas</span><strong class="red">1</strong></article>
    </section>

    <section class="table-shell">
      <div class="filters">
        <span>Filtrar por estado:</span>
        <button class="chip active">Todas</button>
        <button class="chip">Pendientes</button>
        <button class="chip">Aprobadas</button>
        <button class="chip">Rechazadas</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Empleado</th><th>Tipo</th><th>Fechas</th><th>Días</th><th>Disponibles</th><th>Solicitado</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Pérez Rodríguez<br /><small>12.345.678-9</small></td>
            <td><span class="tag blue">Vacaciones</span></td>
            <td>30 abr 2026<br /><small>hasta 09 may 2026</small></td>
            <td class="count">8</td><td class="count green">10</td><td>09 abr 2026</td><td><span class="state ok">Aprobado</span></td><td>Descargar</td>
          </tr>
          <tr>
            <td>María González Silva<br /><small>18.765.432-1</small></td>
            <td><span class="tag purple">Permiso</span></td>
            <td>19 abr 2026<br /><small>hasta 21 abr 2026</small></td>
            <td class="count">3</td><td class="count green">16</td><td>14 abr 2026</td><td><span class="state warn">Pendiente</span></td><td>Aprobar · Rechazar</td>
          </tr>
          <tr>
            <td>Carlos Muñoz López<br /><small>15.234.567-8</small></td>
            <td><span class="tag blue">Vacaciones</span></td>
            <td>31 may 2026<br /><small>hasta 14 jun 2026</small></td>
            <td class="count">11</td><td class="count green">20</td><td>13 abr 2026</td><td><span class="state warn">Pendiente</span></td><td>Aprobar · Rechazar</td>
          </tr>
          <tr>
            <td>Ana Martínez Torres<br /><small>16.987.654-3</small></td>
            <td><span class="tag purple">Permiso</span></td>
            <td>17 abr 2026<br /><small>hasta 17 abr 2026</small></td>
            <td class="count">1</td><td class="count green">9</td><td>16 abr 2026</td><td><span class="state reject">Rechazado</span></td><td>Ver detalle</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    :host { display: grid; gap: 16px; }
    .page-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
    .page-head h1, .page-head p { margin: 0; }
    .page-head p { color: #64748b; margin-top: 6px; }
    .primary { border: 0; color: #fff; background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 14px 16px; border-radius: 14px; font-weight: 700; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .summary-card, .table-shell { border-radius: 18px; background: #fff; border: 1px solid rgba(148,163,184,.2); box-shadow: 0 12px 34px rgba(15,23,42,.08); }
    .summary-card { padding: 16px 18px; display: grid; gap: 8px; }
    .summary-card span { color: #64748b; font-size: .88rem; }
    .summary-card strong { font-size: 1.7rem; }
    .green { color: #16a34a; } .orange { color: #f97316; } .red { color: #dc2626; }
    .table-shell { padding: 14px; }
    .filters { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 14px; }
    .chip { border: 1px solid rgba(148,163,184,.25); background: #fff; border-radius: 999px; padding: 10px 14px; font-weight: 700; }
    .chip.active { background: #2563eb; color: #fff; border-color: #2563eb; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 14px 10px; border-bottom: 1px solid rgba(148,163,184,.14); }
    th { color: #1e293b; font-size: .88rem; }
    td { color: #334155; font-size: .93rem; }
    .count { font-weight: 700; color: #2563eb; }
    .tag, .state { display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px; font-size: .8rem; font-weight: 700; }
    .tag.blue { background: #dbeafe; color: #2563eb; } .tag.purple { background: #f3e8ff; color: #7c3aed; }
    .state.ok { background: #dcfce7; color: #15803d; } .state.warn { background: #ffedd5; color: #c2410c; } .state.reject { background: #fee2e2; color: #b91c1c; }
    @media (max-width: 1100px) { .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } table { display: block; overflow-x: auto; } }
  `]
})
export class VacacionesPageComponent {}
