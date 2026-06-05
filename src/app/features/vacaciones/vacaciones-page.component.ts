import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos de NG-ZORRO
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-vacaciones-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule
  ],
  template: `
    <div class="page-container">
      
      <section class="page-head">
        <div>
          <h1 class="page-title">Vacaciones y Permisos</h1>
          <p class="page-subtitle">Gestión de solicitudes y control de días disponibles</p>
        </div>
        <button nz-button nzType="primary" class="btn-primary">
          <span nz-icon nzType="plus" nzTheme="outline"></span>
          Nueva Solicitud
        </button>
      </section>

      <section class="summary-grid">
        <article class="summary-card">
          <span>Solicitudes Totales</span>
          <strong class="dark">4</strong>
        </article>
        <article class="summary-card">
          <span>Aprobadas</span>
          <strong class="green">1</strong>
        </article>
        <article class="summary-card">
          <span>Pendientes</span>
          <strong class="orange">2</strong>
        </article>
        <article class="summary-card">
          <span>Rechazadas</span>
          <strong class="red">1</strong>
        </article>
      </section>

      <section class="table-shell">
        <div class="filters">
          <span class="filter-label">Filtrar por estado:</span>
          <button class="chip active">Todas</button>
          <button class="chip">Pendientes</button>
          <button class="chip">Aprobadas</button>
          <button class="chip">Rechazadas</button>
        </div>

        <nz-table #vacacionesTable [nzData]="vacacionesMock" [nzShowPagination]="false" nzSize="middle">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Tipo</th>
              <th>Fechas</th>
              <th>Días</th>
              <th>Disponibles</th>
              <th>Solicitado</th>
              <th>Estado</th>
              <th nzAlign="right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (item of vacacionesTable.data; track item.rut) {
              <tr>
                <td>
                  <span class="td-strong">{{ item.empleado }}</span><br />
                  <small class="td-muted">{{ item.rut }}</small>
                </td>
                <td>
                  @if (item.tipo === 'Vacaciones') {
                    <nz-tag class="custom-tag tag-blue">Vacaciones</nz-tag>
                  } @else {
                    <nz-tag class="custom-tag tag-purple">Permiso</nz-tag>
                  }
                </td>
                <td>
                  <span>{{ item.fechaInicio }}</span><br />
                  <small class="td-muted">hasta {{ item.fechaFin }}</small>
                </td>
                <td class="count">{{ item.dias }}</td>
                <td class="count green">{{ item.disponibles }}</td>
                <td>{{ item.solicitado }}</td>
                <td>
                  @switch (item.estado) {
                    @case ('Aprobado') { <nz-tag class="status-tag tag-success">Aprobado</nz-tag> }
                    @case ('Pendiente') { <nz-tag class="status-tag tag-warning">Pendiente</nz-tag> }
                    @case ('Rechazado') { <nz-tag class="status-tag tag-error">Rechazado</nz-tag> }
                  }
                </td>
                <td nzAlign="right" class="action-links">
                  @if (item.estado === 'Aprobado') {
                    <a>Descargar</a>
                  } @else if (item.estado === 'Pendiente') {
                    <a>Aprobar</a> <span class="divider">·</span> <a>Rechazar</a>
                  } @else {
                    <a>Ver detalle</a>
                  }
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

    /* Botón Principal */
    .btn-primary {
      height: 44px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 0 20px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #2563eb;
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-primary:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
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
    .red { color: #dc2626; }

    /* --- FILTROS (CHIPS) --- */
    .filters {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding: 0 8px;
    }

    .filter-label {
      font-size: 0.95rem;
      font-weight: 600;
      color: #475569;
      margin-right: 4px;
    }

    .chip {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #475569;
      border-radius: 999px;
      padding: 8px 16px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .chip:hover {
      background: #f8fafc;
      border-color: #94a3b8;
    }

    .chip.active {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
    }

    /* --- TABLA FLOTANTE NG-ZORRO --- */
    .table-shell {
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
      overflow: hidden;
      padding: 24px;
    }

    ::ng-deep .ant-table-wrapper { background: transparent; }
    ::ng-deep .ant-table { background: transparent; font-size: 0.95rem; }

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

    ::ng-deep .ant-table-tbody > tr:hover > td {
      background: #f8fafc !important;
    }

    /* Estilos específicos de celdas */
    .td-strong { font-weight: 600; color: #0f172a; }
    .td-muted { color: #94a3b8; font-size: 0.85rem; }
    .count { font-weight: 700; color: #2563eb; }
    .count.green { color: #10b981; }

    /* --- ETIQUETAS DE TIPO Y ESTADO (TAGS) --- */
    .custom-tag, .status-tag {
      border: none;
      padding: 4px 12px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.85rem;
      margin: 0;
    }
    
    ::ng-deep .tag-blue { background: #eff6ff; color: #2563eb; }
    ::ng-deep .tag-purple { background: #faf5ff; color: #9333ea; }

    ::ng-deep .tag-success { background: #dcfce7; color: #16a34a; }
    ::ng-deep .tag-warning { background: #ffedd5; color: #ea580c; }
    ::ng-deep .tag-error { background: #fee2e2; color: #dc2626; }

    /* --- ACCIONES --- */
    .action-links a {
      color: #2563eb;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;
      cursor: pointer;
    }
    .action-links a:hover { color: #1d4ed8; text-decoration: underline; }
    .action-links .divider { color: #cbd5e1; margin: 0 6px; font-weight: bold; }

    /* --- RESPONSIVIDAD --- */
    @media (max-width: 768px) {
      .page-head { flex-direction: column; align-items: flex-start; }
      .btn-primary { width: 100%; justify-content: center; }
      ::ng-deep .ant-table { overflow-x: auto; display: block; }
    }
  `]
})
export class VacacionesPageComponent {
  readonly vacacionesMock = [
    {
      empleado: 'Juan Pérez Rodríguez',
      rut: '12.345.678-9',
      tipo: 'Vacaciones',
      fechaInicio: '30 abr 2026',
      fechaFin: '09 may 2026',
      dias: 8,
      disponibles: 10,
      solicitado: '09 abr 2026',
      estado: 'Aprobado'
    },
    {
      empleado: 'María González Silva',
      rut: '18.765.432-1',
      tipo: 'Permiso',
      fechaInicio: '19 abr 2026',
      fechaFin: '21 abr 2026',
      dias: 3,
      disponibles: 16,
      solicitado: '14 abr 2026',
      estado: 'Pendiente'
    },
    {
      empleado: 'Carlos Muñoz López',
      rut: '15.234.567-8',
      tipo: 'Vacaciones',
      fechaInicio: '31 may 2026',
      fechaFin: '14 jun 2026',
      dias: 11,
      disponibles: 20,
      solicitado: '13 abr 2026',
      estado: 'Pendiente'
    },
    {
      empleado: 'Ana Martínez Torres',
      rut: '16.987.654-3',
      tipo: 'Permiso',
      fechaInicio: '17 abr 2026',
      fechaFin: '17 abr 2026',
      dias: 1,
      disponibles: 9,
      solicitado: '16 abr 2026',
      estado: 'Rechazado'
    }
  ];
}