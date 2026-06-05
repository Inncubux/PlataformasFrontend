import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-empleados-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <h1>Empleados</h1>
        <p>Gestión completa de personal</p>
      </div>
      <button class="primary-action">+ Nuevo Empleado</button>
    </section>

    <section class="summary-grid">
      <article class="summary-card"><span>Total Empleados</span><strong>24</strong></article>
      <article class="summary-card"><span>Activos</span><strong class="green">22</strong></article>
      <article class="summary-card"><span>En Vacaciones</span><strong class="orange">2</strong></article>
      <article class="summary-card"><span>Nuevos (Mes)</span><strong class="blue">1</strong></article>
    </section>

    <section class="table-shell">
      <div class="table-actions">
        <input placeholder="Buscar por nombre, RUT, cargo o departamento..." />
        <button>Filtros</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>RUT</th>
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Sueldo Base</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Juan Pérez Rodríguez</strong><br /><small>Capital · Fonasa</small></td>
            <td>12.345.678-9</td>
            <td>Gerente de Ventas</td>
            <td><span class="tag">Ventas</span></td>
            <td>$1.500.000</td>
            <td><span class="state ok">Activo</span></td>
            <td>Ver · Editar · Borrar</td>
          </tr>
          <tr>
            <td><strong>María González Silva</strong><br /><small>Habitat · Isapre Consalud</small></td>
            <td>18.765.432-1</td>
            <td>Contador</td>
            <td><span class="tag">Finanzas</span></td>
            <td>$1.200.000</td>
            <td><span class="state ok">Activo</span></td>
            <td>Ver · Editar · Borrar</td>
          </tr>
          <tr>
            <td><strong>Carlos Muñoz López</strong><br /><small>Provida · Fonasa</small></td>
            <td>15.234.567-8</td>
            <td>Desarrollador Senior</td>
            <td><span class="tag">Tecnología</span></td>
            <td>$1.800.000</td>
            <td><span class="state ok">Activo</span></td>
            <td>Ver · Editar · Borrar</td>
          </tr>
          <tr>
            <td><strong>Ana Martínez Torres</strong><br /><small>Modelo · Fonasa</small></td>
            <td>16.987.654-3</td>
            <td>Asistente Administrativa</td>
            <td><span class="tag">Administración</span></td>
            <td>$800.000</td>
            <td><span class="state ok">Activo</span></td>
            <td>Ver · Editar · Borrar</td>
          </tr>
          <tr>
            <td><strong>Pedro Sánchez Vega</strong><br /><small>Cuprum · Fonasa</small></td>
            <td>19.123.456-7</td>
            <td>Vendedor</td>
            <td><span class="tag">Ventas</span></td>
            <td>$600.000</td>
            <td><span class="state warn">Vacaciones</span></td>
            <td>Ver · Editar · Borrar</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    :host {
      display: grid;
      gap: 16px;
    }

    .page-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }

    .page-head h1,
    .page-head p {
      margin: 0;
    }

    .page-head p {
      color: #64748b;
      margin-top: 6px;
    }

    .primary-action {
      border: 0;
      color: #fff;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      padding: 14px 18px;
      border-radius: 14px;
      font-weight: 700;
      box-shadow: 0 12px 24px rgba(37, 99, 235, 0.24);
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }

    .summary-card,
    .table-shell {
      border-radius: 18px;
      background: #fff;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 12px 34px rgba(15, 23, 42, 0.08);
    }

    .summary-card {
      padding: 16px 18px;
      display: grid;
      gap: 8px;
    }

    .summary-card span {
      color: #64748b;
      font-size: 0.88rem;
    }

    .summary-card strong {
      font-size: 1.7rem;
    }

    .green { color: #16a34a; }
    .orange { color: #f97316; }
    .blue { color: #2563eb; }

    .table-shell {
      padding: 14px;
    }

    .table-actions {
      display: flex;
      gap: 12px;
      margin-bottom: 14px;
    }

    .table-actions input,
    .table-actions button {
      border: 1px solid rgba(148, 163, 184, 0.24);
      border-radius: 12px;
      padding: 12px 14px;
      background: #fff;
    }

    .table-actions input {
      flex: 1;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      text-align: left;
      padding: 14px 10px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.14);
    }

    th {
      color: #1e293b;
      font-size: 0.88rem;
    }

    td {
      color: #334155;
      font-size: 0.93rem;
      vertical-align: middle;
    }

    small {
      color: #94a3b8;
    }

    .tag,
    .state {
      display: inline-flex;
      align-items: center;
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .tag { background: #dbeafe; color: #2563eb; }
    .state.ok { background: #dcfce7; color: #15803d; }
    .state.warn { background: #ffedd5; color: #c2410c; }

    @media (max-width: 1100px) {
      .summary-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      table {
        display: block;
        overflow-x: auto;
      }
    }
  `]
})
export class EmpleadosPageComponent {}
