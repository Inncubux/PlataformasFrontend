import { ChangeDetectionStrategy, Component } from '@angular/core';

// Módulos necesarios de NG-ZORRO para esta vista
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liquidaciones-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzCardModule,
    NzGridModule
  ],
  template: `
    <div class="page-container">
      
      <section class="page-head">
        <div>
          <h1 class="page-title">Liquidaciones de Sueldo</h1>
          <p class="page-subtitle">Generación y gestión de liquidaciones mensuales</p>
        </div>
        <div class="actions">
          <button nz-button class="btn-secondary">Generar LRE (CSV)</button>
          <button nz-button nzType="primary" class="btn-primary">
            <span nz-icon nzType="plus"></span>
            Nueva Liquidación
          </button>
        </div>
      </section>

      <section class="summary-grid">
        <article class="summary-card">
          <span>Liquidaciones Marzo</span>
          <strong class="dark">24</strong>
        </article>
        <article class="summary-card">
          <span>Firmadas</span>
          <strong class="green">21</strong>
        </article>
        <article class="summary-card">
          <span>Pendientes</span>
          <strong class="orange">3</strong>
        </article>
        <article class="summary-card">
          <span>Gasto Total</span>
          <strong class="blue">$12.5M</strong>
        </article>
      </section>

      <section class="table-shell">
        <nz-table #basicTable [nzData]="liquidacionesMock" [nzShowPagination]="false" nzSize="middle">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>RUT</th>
              <th>Período</th>
              <th>Sueldo Base</th>
              <th>Total Haberes</th>
              <th>Descuentos</th>
              <th>Líquido</th>
              <th>Estado</th>
              <th nzAlign="right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (item of basicTable.data; track item.rut) {
              <tr>
                <td class="td-strong">{{ item.empleado }}</td>
                <td class="td-muted">{{ item.rut }}</td>
                <td>{{ item.periodo }}</td>
                <td>{{ item.base }}</td>
                <td>{{ item.haberes }}</td>
                <td class="negative">{{ item.descuentos }}</td>
                <td class="positive">{{ item.liquido }}</td>
                <td>
                  @if (item.estado === 'Firmado') {
                    <nz-tag class="status-tag tag-success">Firmado</nz-tag>
                  } @else {
                    <nz-tag class="status-tag tag-warning">Pendiente</nz-tag>
                  }
                </td>
                <td nzAlign="right" class="action-links">
                  <a>Ver</a> <span class="divider">·</span> <a>Descargar</a>
                </td>
              </tr>
            }
          </tbody>
        </nz-table>
      </section>
      
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding-bottom: 24px;
    }

    .page-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* --- CABECERA --- */
    .page-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .page-title {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .page-subtitle {
      margin: 4px 0 0;
      color: #64748b;
      font-size: 0.95rem;
    }

    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    /* Botones Premium */
    .actions button {
      height: 44px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 0 20px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .btn-primary {
      background: #2563eb;
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
    }
    .btn-primary:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
    }

    .btn-secondary {
      background: #ffffff;
      color: #334155;
      border: 1px solid #cbd5e1;
    }
    .btn-secondary:hover {
      background: #f8fafc;
      border-color: #94a3b8;
      color: #0f172a;
    }

    /* --- KPI GRID --- */
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .summary-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 24px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .summary-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
    }

    .summary-card span { color: #64748b; font-size: 0.95rem; font-weight: 600; }
    .summary-card strong { font-size: 2rem; line-height: 1; font-weight: 800; }

    .dark { color: #0f172a; }
    .green { color: #16a34a; }
    .orange { color: #ea580c; }
    .blue { color: #2563eb; }

    /* --- TABLA FLOTANTE NG-ZORRO --- */
    .table-shell {
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
      overflow: hidden; /* Clave para que la tabla no rompa los bordes redondeados */
      padding: 8px;
    }

    /* Limpiar bordes internos de la tabla Zorro */
    ::ng-deep .ant-table-wrapper {
      background: transparent;
    }

    ::ng-deep .ant-table {
      background: transparent;
      font-size: 0.95rem;
    }

    ::ng-deep .ant-table-thead > tr > th {
      background: transparent;
      color: #64748b;
      font-weight: 600;
      border-bottom: 2px solid #f1f5f9;
      padding: 16px;
    }

    ::ng-deep .ant-table-tbody > tr > td {
      border-bottom: 1px solid #f1f5f9;
      padding: 16px;
      color: #334155;
    }

    /* Hover effect en filas */
    ::ng-deep .ant-table-tbody > tr:hover > td {
      background: #f8fafc !important;
    }

    /* Estilos específicos de celdas */
    .td-strong { font-weight: 600; color: #0f172a !important; }
    .td-muted { color: #64748b !important; font-size: 0.9rem; }
    .negative { color: #ef4444 !important; font-weight: 700; }
    .positive { color: #10b981 !important; font-weight: 700; }

    /* --- ETIQUETAS DE ESTADO (TAGS) --- */
    .status-tag {
      border: none;
      padding: 4px 12px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.85rem;
      margin: 0;
    }
    
    ::ng-deep .tag-success { background: #dcfce7; color: #16a34a; }
    ::ng-deep .tag-warning { background: #ffedd5; color: #ea580c; }

    /* --- ACCIONES --- */
    .action-links a {
      color: #2563eb;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;
    }
    .action-links a:hover { color: #1d4ed8; text-decoration: underline; }
    .action-links .divider { color: #cbd5e1; margin: 0 8px; }

    /* --- RESPONSIVIDAD --- */
    @media (max-width: 768px) {
      .page-head { flex-direction: column; align-items: flex-start; }
      .actions { width: 100%; }
      .actions button { flex: 1; justify-content: center; }
      ::ng-deep .ant-table { overflow-x: auto; display: block; }
    }
  `]
})
export class LiquidacionesPageComponent {
  // Llevamos la data al controlador para que Zorro la pinte con @for (Iterador de Angular 17+)
  readonly liquidacionesMock = [
    {
      empleado: 'Juan Pérez Rodríguez',
      rut: '12.345.678-9',
      periodo: 'Marzo 2026',
      base: '$1.500.000',
      haberes: '$1.600.000',
      descuentos: '$350.000',
      liquido: '$1.250.000',
      estado: 'Firmado'
    },
    {
      empleado: 'María González Silva',
      rut: '18.765.432-1',
      periodo: 'Marzo 2026',
      base: '$1.200.000',
      haberes: '$1.250.000',
      descuentos: '$280.000',
      liquido: '$970.000',
      estado: 'Firmado'
    },
    {
      empleado: 'Carlos Muñoz López',
      rut: '15.234.567-8',
      periodo: 'Marzo 2026',
      base: '$1.800.000',
      haberes: '$1.950.000',
      descuentos: '$450.000',
      liquido: '$1.500.000',
      estado: 'Pendiente'
    }
  ];
}