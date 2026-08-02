import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Módulos de NG-ZORRO
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

type EmployeeRow = {
  nombre: string;
  meta: string;
  rut: string;
  cargo: string;
  departamento: string;
  sueldo: string;
  estado: 'Activo' | 'Vacaciones';
};

type EmployeeModalMode = 'create' | 'view' | 'edit';

const emptyEmployee: EmployeeRow = {
  nombre: '',
  meta: '',
  rut: '',
  cargo: '',
  departamento: '',
  sueldo: '',
  estado: 'Activo',
};

@Component({
  selector: 'app-empleados-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    NzTagModule,
    NzInputModule,
    NzSelectModule
  ],
  template: `
    <div class="page-container">
      
      <section class="page-head">
        <div>
          <h1 class="page-title">Empleados</h1>
          <p class="page-subtitle">Gestión completa de personal</p>
        </div>
        <button nz-button nzType="primary" class="btn-primary" (click)="openEmployeeModal()">
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
                  <a (click)="openEmployeeModal(emp, 'view')">Ver</a> 
                  <span class="divider">·</span> 
                  <a (click)="openEmployeeModal(emp, 'edit')">Editar</a> 
                  <span class="divider">·</span> 
                  <a class="danger" (click)="removeEmployee(emp.rut)">Borrar</a>
                </td>
              </tr>
            }
          </tbody>
        </nz-table>
      </section>

      <nz-modal
        [(nzVisible)]="employeeModalVisible"
        [nzTitle]="employeeModalTitle"
        [nzFooter]="null"
        [nzWidth]="720"
        (nzOnCancel)="closeEmployeeModal()"
      >
          <ng-template nzModalContent>
            <div class="modal-body-stack">
              <div class="modal-details" [hidden]="employeeModalMode !== 'view'">
                <p class="modal-description">Revisa la información del empleado.</p>
                <div class="details-grid">
                  <div class="detail-item"><span>Nombre completo</span><strong>{{ currentEmployee.nombre }}</strong></div>
                  <div class="detail-item"><span>RUT</span><strong>{{ currentEmployee.rut }}</strong></div>
                  <div class="detail-item"><span>Cargo</span><strong>{{ currentEmployee.cargo }}</strong></div>
                  <div class="detail-item"><span>Departamento</span><strong>{{ currentEmployee.departamento }}</strong></div>
                  <div class="detail-item"><span>Sueldo base</span><strong>{{ currentEmployee.sueldo }}</strong></div>
                  <div class="detail-item"><span>Estado</span><strong>{{ currentEmployee.estado }}</strong></div>
                  <div class="detail-item detail-item-full"><span>Referencia previsional</span><strong>{{ currentEmployee.meta }}</strong></div>
                </div>
                <div class="modal-actions">
                  <button nz-button type="button" class="btn-cancel" (click)="closeEmployeeModal()">Cerrar</button>
                </div>
              </div>

              <form [formGroup]="employeeForm" class="employee-modal-form" [hidden]="employeeModalMode === 'view'">
            <p class="modal-description">Completa los datos del empleado.</p>
            <div class="modal-summary" [hidden]="employeeModalMode === 'view'">
              <span>Nombre actual:</span>
              <strong>{{ employeeForm.get('nombre')?.value || 'Nuevo registro' }}</strong>
            </div>
            <div class="modal-grid">
              <label class="field">
                <span>Nombre completo</span>
                <input nz-input formControlName="nombre" placeholder="Nombre y apellido" />
              </label>

              <label class="field">
                <span>RUT</span>
                <input nz-input formControlName="rut" placeholder="12.345.678-9" />
              </label>

              <label class="field">
                <span>Cargo</span>
                <input nz-input formControlName="cargo" placeholder="Cargo del empleado" />
              </label>

              <label class="field">
                <span>Departamento</span>
                <input nz-input formControlName="departamento" placeholder="Área o unidad" />
              </label>

              <label class="field">
                <span>Sueldo base</span>
                <input nz-input formControlName="sueldo" placeholder="$1.000.000" />
              </label>

              <label class="field">
                <span>Estado</span>
                <nz-select formControlName="estado" nzPlaceHolder="Selecciona el estado">
                  @for (estado of estados; track estado) {
                    <nz-option [nzValue]="estado" [nzLabel]="estado"></nz-option>
                  }
                </nz-select>
              </label>

              <label class="field field-full">
                <span>Referencia previsional</span>
                <input nz-input formControlName="meta" placeholder="AFP · Isapre / Fonasa" />
              </label>
            </div>

            <div class="modal-actions">
              <button nz-button type="button" class="btn-cancel" (click)="closeEmployeeModal()">
                Cancelar
              </button>
              <button nz-button nzType="primary" type="button" class="btn-save" (click)="saveEmployee()" [disabled]="employeeForm.invalid">
                {{ employeeModalMode === 'edit' ? 'Actualizar empleado' : 'Guardar empleado' }}
              </button>
            </div>
          </form>
          </div>
        </ng-template>
      </nz-modal>

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

    .employee-modal-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-top: 8px;
    }

    .modal-description {
      margin: 0;
      color: #64748b;
      font-size: 0.95rem;
    }

    .modal-body-stack {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .modal-details {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-top: 8px;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .detail-item {
      padding: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .detail-item span {
      color: #64748b;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .detail-item strong {
      color: #0f172a;
      font-size: 0.98rem;
      font-weight: 700;
    }

    .detail-item-full {
      grid-column: 1 / -1;
    }

    .modal-summary {
      display: flex;
      gap: 8px;
      align-items: baseline;
      padding: 12px 16px;
      border-radius: 12px;
      background: #eff6ff;
      color: #1d4ed8;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .modal-summary strong {
      color: #0f172a;
    }

    .modal-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-weight: 600;
      color: #334155;
    }

    .field span {
      font-size: 0.9rem;
    }

    .field-full {
      grid-column: 1 / -1;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-cancel,
    .btn-save {
      height: 42px;
      border-radius: 12px;
      padding: 0 20px;
      font-weight: 700;
    }

    .btn-cancel {
      border: 1px solid #cbd5e1;
      color: #334155;
      background: #ffffff;
    }

    .btn-save {
      background: #2563eb;
      border: none;
      color: #ffffff;
    }

    /* Responsividad */
    @media (max-width: 768px) {
      .page-head { flex-direction: column; align-items: flex-start; }
      .btn-primary { width: 100%; justify-content: center; }
      .table-actions { flex-direction: column; }
      .btn-filter { width: 100%; }
      .modal-grid { grid-template-columns: 1fr; }
      .details-grid { grid-template-columns: 1fr; }
      ::ng-deep .ant-table { overflow-x: auto; display: block; }
    }
  `]
})
export class EmpleadosPageComponent {
  private readonly formBuilder = new FormBuilder();

  readonly estados: EmployeeRow['estado'][] = ['Activo', 'Vacaciones'];

  employeeModalVisible = false;
  employeeModalMode: EmployeeModalMode = 'create';
  private editingRut: string | null = null;

  readonly employeeForm = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required]],
    meta: ['', [Validators.required]],
    rut: ['', [Validators.required]],
    cargo: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    sueldo: ['', [Validators.required]],
    estado: ['Activo' as EmployeeRow['estado'], [Validators.required]],
  });

  empleadosMock: EmployeeRow[] = [
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

  get employeeModalTitle(): string {
    if (this.employeeModalMode === 'view') {
      return 'Detalle de empleado';
    }

    return this.employeeModalMode === 'edit' ? 'Editar empleado' : 'Nuevo empleado';
  }

  get isReadOnly(): boolean {
    return this.employeeModalMode === 'view';
  }

  get currentEmployee(): EmployeeRow {
    return {
      nombre: this.employeeForm.getRawValue().nombre || emptyEmployee.nombre,
      meta: this.employeeForm.getRawValue().meta || emptyEmployee.meta,
      rut: this.employeeForm.getRawValue().rut || emptyEmployee.rut,
      cargo: this.employeeForm.getRawValue().cargo || emptyEmployee.cargo,
      departamento: this.employeeForm.getRawValue().departamento || emptyEmployee.departamento,
      sueldo: this.employeeForm.getRawValue().sueldo || emptyEmployee.sueldo,
      estado: (this.employeeForm.getRawValue().estado || emptyEmployee.estado) as EmployeeRow['estado'],
    };
  }

  openEmployeeModal(employee?: EmployeeRow, mode: EmployeeModalMode = 'create'): void {
    this.employeeModalMode = mode;
    this.editingRut = mode === 'edit' ? employee?.rut ?? null : null;
    this.employeeForm.reset({
      nombre: employee?.nombre ?? '',
      meta: employee?.meta ?? '',
      rut: employee?.rut ?? '',
      cargo: employee?.cargo ?? '',
      departamento: employee?.departamento ?? '',
      sueldo: employee?.sueldo ?? '',
      estado: employee?.estado ?? 'Activo',
    });
    this.employeeModalVisible = true;
  }

  closeEmployeeModal(): void {
    this.employeeModalVisible = false;
  }

  saveEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employee = this.employeeForm.getRawValue();
    const updatedEmployee: EmployeeRow = {
      ...employee,
      estado: employee.estado as EmployeeRow['estado'],
    };

    if (this.employeeModalMode === 'edit' && this.editingRut) {
      this.empleadosMock = this.empleadosMock.map((item) =>
        item.rut === this.editingRut ? updatedEmployee : item
      );
    } else {
      this.empleadosMock = [...this.empleadosMock, updatedEmployee];
    }

    this.closeEmployeeModal();
  }

  removeEmployee(rut: string): void {
    this.empleadosMock = this.empleadosMock.filter((item) => item.rut !== rut);
  }
}