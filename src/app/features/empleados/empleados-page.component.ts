import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos de NG-ZORRO
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-empleados-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzInputModule
  ],
  template: `
    <div class="page-container">
      
      <section class="page-head">
        <div>
          <h1 class="page-title">Empleados</h1>
          <p class="page-subtitle">Gestión completa de personal</p>
        </div>
        <button nz-button nzType="primary" class="btn-primary">
          <span nz-icon nzType="plus" nzTheme="outline"></span>
          Nuevo Empleado
        </button>
      </section>

      <section class="summary-grid">
        <article class="summary-card">
          <span>Total Empleados</span>
          <strong class="dark">24</strong>
        </article>
        <article class="summary-card">
          <span>Activos</span>
          <strong class="green">22</strong>
        </article>
        <article class="summary-card">
          <span>En Vacaciones</span>
          <strong class="orange">2</strong>
        </article>
        <article class="summary-card">
          <span>Nuevos (Mes)</span>
          <strong class="blue">1</strong>
        </article>
      </section>

      <section class="table-shell">
        
        <div class="table-actions">
          <nz-input-group [nzPrefix]="prefixIconSearch" class="search-input">
            <input type="text" nz-input placeholder="Buscar por nombre, RUT, cargo o departamento..." />
          </nz-input-group>
          <ng-template #prefixIconSearch>
            <span nz-icon nzType="search" style="color: #94a3b8;"></span>
          </ng-template>

          <button nz-button class="btn-filter">
            Filtros
          </button>
        </div>

        <nz-table #empleadosTable [nzData]="empleadosMock" [nzShowPagination]="false" nzSize="middle">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>RUT</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Sueldo Base</th>
              <th>Estado</th>
              <th nzAlign="right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (emp of empleadosTable.data; track emp.rut) {
              <tr>
                <td>
                  <span class="td-strong">{{ emp.nombre }}</span><br />
                  <small class="td-muted">{{ emp.meta }}</small>
                </td>
                <td class="td-rut">{{ emp.rut }}</td>
                <td>{{ emp.cargo }}</td>
                <td>
                  <nz-tag class="custom-tag tag-blue">{{ emp.departamento }}</nz-tag>
                </td>
                <td class="td-strong">{{ emp.sueldo }}</td>
                <td>
                  @if (emp.estado === 'Activo') {
                    <nz-tag class="status-tag tag-success">Activo</nz-tag>
                  } @else {
                    <nz-tag class="status-tag tag-warning">Vacaciones</nz-tag>
                  }
                </td>
                <td nzAlign="right" class="action-links">
                  <a>Ver</a> 
                  <span class="divider">·</span> 
                  <a>Editar</a> 
                  <span class="divider">·</span> 
                  <a class="danger">Borrar</a>
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
    .blue { color: #2563eb; }

    /* --- TABLA FLOTANTE NG-ZORRO --- */
    .table-shell {
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
      overflow: hidden;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Barra de Filtros */
    .table-actions {
      display: flex;
      gap: 12px;
    }

    ::ng-deep .search-input.ant-input-affix-wrapper {
      flex: 1;
      border-radius: 12px;
      padding: 8px 16px;
      border-color: #e2e8f0;
      background: #f8fafc;
      transition: all 0.2s;
    }
    ::ng-deep .search-input.ant-input-affix-wrapper:focus-within {
      background: #ffffff;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
    ::ng-deep .search-input input {
      background: transparent;
      font-size: 0.95rem;
    }

    .btn-filter {
      height: 42px;
      border-radius: 12px;
      padding: 0 20px;
      font-weight: 600;
      color: #475569;
      border: 1px solid #cbd5e1;
      transition: all 0.2s;
    }
    .btn-filter:hover {
      border-color: #94a3b8;
      color: #0f172a;
      background: #f8fafc;
    }

    /* Limpiar bordes de Zorro */
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

    /* Estilos de Celdas */
    .td-strong { font-weight: 600; color: #0f172a; }
    .td-muted { color: #94a3b8; font-size: 0.85rem; }
    .td-rut { font-family: monospace; color: #475569; font-size: 0.95rem; }

    /* Etiquetas */
    .custom-tag, .status-tag {
      border: none;
      padding: 4px 12px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.85rem;
      margin: 0;
    }
    
    ::ng-deep .tag-blue { background: #eff6ff; color: #2563eb; }
    ::ng-deep .tag-success { background: #dcfce7; color: #16a34a; }
    ::ng-deep .tag-warning { background: #ffedd5; color: #ea580c; }

    /* Acciones */
    .action-links a {
      color: #2563eb;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;
      cursor: pointer;
    }
    .action-links a:hover { color: #1d4ed8; text-decoration: underline; }
    .action-links a.danger { color: #ef4444; }
    .action-links a.danger:hover { color: #b91c1c; }
    .action-links .divider { color: #cbd5e1; margin: 0 6px; font-weight: bold; }

    /* Responsividad */
    @media (max-width: 768px) {
      .page-head { flex-direction: column; align-items: flex-start; }
      .btn-primary { width: 100%; justify-content: center; }
      .table-actions { flex-direction: column; }
      .btn-filter { width: 100%; }
      ::ng-deep .ant-table { overflow-x: auto; display: block; }
    }
  `]
})
export class EmpleadosPageComponent {
  // Llevamos la data cruda a un arreglo para que NG-ZORRO pueda renderizarla con @for
  readonly empleadosMock = [
    {
      nombre: 'Juan Pérez Rodríguez',
      meta: 'Capital · Fonasa',
      rut: '12.345.678-9',
      cargo: 'Gerente de Ventas',
      departamento: 'Ventas',
      sueldo: '$1.500.000',
      estado: 'Activo'
    },
    {
      nombre: 'María González Silva',
      meta: 'Habitat · Isapre Consalud',
      rut: '18.765.432-1',
      cargo: 'Contador',
      departamento: 'Finanzas',
      sueldo: '$1.200.000',
      estado: 'Activo'
    },
    {
      nombre: 'Carlos Muñoz López',
      meta: 'Provida · Fonasa',
      rut: '15.234.567-8',
      cargo: 'Desarrollador Senior',
      departamento: 'Tecnología',
      sueldo: '$1.800.000',
      estado: 'Activo'
    },
    {
      nombre: 'Ana Martínez Torres',
      meta: 'Modelo · Fonasa',
      rut: '16.987.654-3',
      cargo: 'Asistente Administrativa',
      departamento: 'Administración',
      sueldo: '$800.000',
      estado: 'Activo'
    },
    {
      nombre: 'Pedro Sánchez Vega',
      meta: 'Cuprum · Fonasa',
      rut: '19.123.456-7',
      cargo: 'Vendedor',
      departamento: 'Ventas',
      sueldo: '$600.000',
      estado: 'Vacaciones'
    }
  ];
}