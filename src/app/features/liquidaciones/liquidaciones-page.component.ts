import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-liquidaciones-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <h1>Liquidaciones de Sueldo</h1>
        <p>Generación y gestión de liquidaciones mensuales</p>
      </div>
      <div class="actions">
        <button class="secondary">Generar LRE (CSV)</button>
        <button class="primary">+ Nueva Liquidación</button>
      </div>
    </section>

    <section class="summary-grid">
      <article class="summary-card"><span>Liquidaciones Marzo</span><strong>24</strong></article>
      <article class="summary-card"><span>Firmadas</span><strong class="green">21</strong></article>
      <article class="summary-card"><span>Pendientes</span><strong class="orange">3</strong></article>
      <article class="summary-card"><span>Gasto Total</span><strong class="blue">$12.5M</strong></article>
    </section>

    <section class="table-shell">
      <table>
        <thead>
          <tr>
            <th>Empleado</th><th>RUT</th><th>Período</th><th>Sueldo Base</th><th>Total Haberes</th><th>Descuentos</th><th>Líquido</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Pérez Rodríguez</td><td>12.345.678-9</td><td>Marzo 2026</td><td>$1.500.000</td><td>$1.600.000</td><td class="negative">$350.000</td><td class="positive">$1.250.000</td><td><span class="state ok">Firmado</span></td><td>Ver · Descargar</td>
          </tr>
          <tr>
            <td>María González Silva</td><td>18.765.432-1</td><td>Marzo 2026</td><td>$1.200.000</td><td>$1.250.000</td><td class="negative">$280.000</td><td class="positive">$970.000</td><td><span class="state ok">Firmado</span></td><td>Ver · Descargar</td>
          </tr>
          <tr>
            <td>Carlos Muñoz López</td><td>15.234.567-8</td><td>Marzo 2026</td><td>$1.800.000</td><td>$1.950.000</td><td class="negative">$450.000</td><td class="positive">$1.500.000</td><td><span class="state warn">Pendiente</span></td><td>Ver · Descargar</td>
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
    .actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .actions button { border: 0; border-radius: 14px; padding: 14px 16px; font-weight: 700; }
    .actions .primary { color: #fff; background: linear-gradient(135deg, #2563eb, #1d4ed8); }
    .actions .secondary { background: #fff; border: 1px solid rgba(148, 163, 184, 0.25); }
    .summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .summary-card, .table-shell { border-radius: 18px; background: #fff; border: 1px solid rgba(148,163,184,.2); box-shadow: 0 12px 34px rgba(15,23,42,.08); }
    .summary-card { padding: 16px 18px; display: grid; gap: 8px; }
    .summary-card span { color: #64748b; font-size: .88rem; }
    .summary-card strong { font-size: 1.7rem; }
    .green { color: #16a34a; } .orange { color: #f97316; } .blue { color: #2563eb; }
    .table-shell { padding: 14px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 14px 10px; border-bottom: 1px solid rgba(148,163,184,.14); }
    th { color: #1e293b; font-size: .88rem; }
    td { color: #334155; font-size: .93rem; }
    .negative { color: #ef4444; font-weight: 700; } .positive { color: #16a34a; font-weight: 700; }
    .state { display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px; font-size: .8rem; font-weight: 700; }
    .state.ok { background: #dcfce7; color: #15803d; } .state.warn { background: #ffedd5; color: #c2410c; }
    @media (max-width: 1100px) { .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } table { display: block; overflow-x: auto; } }
  `]
})
export class LiquidacionesPageComponent {}
