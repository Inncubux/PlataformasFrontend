import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Módulos de NG-ZORRO
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

type VacationRow = {
  empleado: string;
  rut: string;
  tipo: 'Vacaciones' | 'Permiso';
  fechaInicio: string;
  fechaFin: string;
  dias: number;
  disponibles: number;
  solicitado: string;
  estado: 'Aprobado' | 'Pendiente' | 'Rechazado';
  motivo: string;
};

type VacationModalMode = 'create' | 'view';

@Component({
  selector: 'app-vacaciones-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
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
        <button nz-button nzType="primary" class="btn-primary" (click)="openSolicitudModal()">
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
                    <a (click)="openSolicitudModal(item, 'view')">Ver detalle</a>
                    <span class="divider">·</span>
                    <a>Descargar</a>
                  } @else if (item.estado === 'Pendiente') {
                    <a (click)="approveSolicitud(item.rut)">Aprobar</a> <span class="divider">·</span> <a (click)="rejectSolicitud(item.rut)">Rechazar</a> <span class="divider">·</span> <a (click)="openSolicitudModal(item, 'view')">Ver detalle</a>
                  } @else {
                    <a (click)="openSolicitudModal(item, 'view')">Ver detalle</a>
                  }
                </td>
              </tr>
            }
          </tbody>
        </nz-table>
      </section>

      <nz-modal
        [(nzVisible)]="solicitudModalVisible"
        [nzTitle]="solicitudModalTitle"
        [nzFooter]="null"
        [nzWidth]="640"
        (nzOnCancel)="closeSolicitudModal()"
      >
          <ng-template nzModalContent>
            <div class="modal-body-stack">
              <div class="modal-details" [hidden]="solicitudModalMode !== 'view'">
                <p class="modal-description">Revisa la solicitud completa.</p>
                <div class="details-grid">
                  <div class="detail-item"><span>Empleado</span><strong>{{ solicitudForm.get('empleado')?.value }}</strong></div>
                  <div class="detail-item"><span>RUT</span><strong>{{ solicitudForm.get('rut')?.value }}</strong></div>
                  <div class="detail-item"><span>Tipo</span><strong>{{ solicitudForm.get('tipo')?.value }}</strong></div>
                  <div class="detail-item"><span>Fecha inicio</span><strong>{{ solicitudForm.get('fechaInicio')?.value }}</strong></div>
                  <div class="detail-item"><span>Fecha fin</span><strong>{{ solicitudForm.get('fechaFin')?.value }}</strong></div>
                  <div class="detail-item"><span>Días</span><strong>{{ solicitudForm.get('dias')?.value }}</strong></div>
                  <div class="detail-item"><span>Días disponibles</span><strong>{{ solicitudForm.get('disponibles')?.value }}</strong></div>
                  <div class="detail-item"><span>Solicitado</span><strong>{{ solicitudForm.get('solicitado')?.value }}</strong></div>
                  <div class="detail-item detail-item-full"><span>Motivo</span><strong>{{ solicitudForm.get('motivo')?.value }}</strong></div>
                  <div class="detail-item detail-item-full"><span>Estado</span><strong>{{ solicitudForm.get('estado')?.value }}</strong></div>
                </div>
                <div class="modal-actions">
                  <button nz-button type="button" class="btn-cancel" (click)="closeSolicitudModal()">Cerrar</button>
                </div>
              </div>

              <form [formGroup]="solicitudForm" class="modal-form" [hidden]="solicitudModalMode === 'view'">
                <p class="modal-description">Completa los datos para registrar una nueva solicitud.</p>
                <div class="modal-grid">
                  <label class="field">
                    <span>Empleado</span>
                    <input nz-input formControlName="empleado" placeholder="Nombre del empleado" />
                  </label>

                  <label class="field">
                    <span>RUT</span>
                    <input nz-input formControlName="rut" placeholder="12.345.678-9" />
                  </label>

                  <label class="field">
                    <span>Tipo</span>
                    <input nz-input formControlName="tipo" placeholder="Vacaciones o permiso" />
                  </label>

                  <label class="field">
                    <span>Fecha inicio</span>
                    <input nz-input formControlName="fechaInicio" placeholder="30 abr 2026" />
                  </label>

                  <label class="field">
                    <span>Fecha fin</span>
                    <input nz-input formControlName="fechaFin" placeholder="09 may 2026" />
                  </label>

                  <label class="field">
                    <span>Días</span>
                    <input nz-input formControlName="dias" placeholder="8" />
                  </label>

                  <label class="field">
                    <span>Días disponibles</span>
                    <input nz-input formControlName="disponibles" placeholder="10" />
                  </label>

                  <label class="field">
                    <span>Motivo</span>
                    <input nz-input formControlName="motivo" placeholder="Motivo de la solicitud" />
                  </label>

                  <label class="field">
                    <span>Solicitado</span>
                    <input nz-input formControlName="solicitado" placeholder="09 abr 2026" />
                  </label>

                  <label class="field field-full">
                    <span>Estado</span>
                    <input nz-input formControlName="estado" placeholder="Aprobado / Pendiente / Rechazado" />
                  </label>
                </div>

                <div class="modal-actions">
                  <button nz-button type="button" class="btn-cancel" (click)="closeSolicitudModal()">Cancelar</button>
                  <button nz-button nzType="primary" type="button" class="btn-save" (click)="saveSolicitud()" [disabled]="solicitudForm.invalid">
                    Guardar solicitud
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

    .modal-description {
      margin: 0;
      color: #64748b;
      font-size: 0.95rem;
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

    .modal-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-top: 8px;
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
      color: #334155;
      font-weight: 600;
    }

    .field span {
      font-size: 0.9rem;
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

    /* --- RESPONSIVIDAD --- */
    @media (max-width: 768px) {
      .page-head { flex-direction: column; align-items: flex-start; }
      .btn-primary { width: 100%; justify-content: center; }
      .modal-grid { grid-template-columns: 1fr; }
      .details-grid { grid-template-columns: 1fr; }
      ::ng-deep .ant-table { overflow-x: auto; display: block; }
    }
  `]
})
export class VacacionesPageComponent {
  private readonly formBuilder = new FormBuilder();

  solicitudModalVisible = false;
  solicitudModalMode: VacationModalMode = 'create';

  readonly solicitudForm = this.formBuilder.nonNullable.group({
    empleado: ['', [Validators.required]],
    rut: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
    dias: ['', [Validators.required]],
    disponibles: ['', [Validators.required]],
    solicitado: ['', [Validators.required]],
    estado: ['Pendiente' as VacationRow['estado'], [Validators.required]],
    motivo: ['', [Validators.required]],
  });

  vacacionesMock: VacationRow[] = [
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
      ,
      motivo: 'Vacaciones anuales solicitadas con anticipación'
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
      ,
      motivo: 'Permiso médico breve'
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
      ,
      motivo: 'Vacaciones de invierno'
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
      ,
      motivo: 'Permiso personal sin disponibilidad'
    }
  ];

  get solicitudModalTitle(): string {
    return this.solicitudModalMode === 'view' ? 'Detalle de solicitud' : 'Nueva solicitud';
  }

  get isReadOnly(): boolean {
    return this.solicitudModalMode === 'view';
  }

  openSolicitudModal(solicitud?: VacationRow, mode: VacationModalMode = 'create'): void {
    this.solicitudModalMode = mode;
    this.solicitudForm.reset({
      empleado: solicitud?.empleado ?? '',
      rut: solicitud?.rut ?? '',
      tipo: solicitud?.tipo ?? '',
      fechaInicio: solicitud?.fechaInicio ?? '',
      fechaFin: solicitud?.fechaFin ?? '',
      dias: String(solicitud?.dias ?? ''),
      disponibles: String(solicitud?.disponibles ?? ''),
      solicitado: solicitud?.solicitado ?? '',
      estado: solicitud?.estado ?? 'Pendiente',
      motivo: solicitud?.motivo ?? '',
    });
    this.solicitudModalVisible = true;
  }

  closeSolicitudModal(): void {
    this.solicitudModalVisible = false;
  }

  saveSolicitud(): void {
    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
      return;
    }

    const solicitud = this.solicitudForm.getRawValue();

    this.vacacionesMock = [
      ...this.vacacionesMock,
      {
        empleado: solicitud.empleado,
        rut: solicitud.rut,
        tipo: solicitud.tipo as VacationRow['tipo'],
        fechaInicio: solicitud.fechaInicio,
        fechaFin: solicitud.fechaFin,
        dias: Number(solicitud.dias),
        disponibles: Number(solicitud.disponibles),
        solicitado: solicitud.solicitado,
        estado: solicitud.estado as VacationRow['estado'],
        motivo: solicitud.motivo,
      },
    ];

    this.closeSolicitudModal();
  }

  approveSolicitud(rut: string): void {
    this.vacacionesMock = this.vacacionesMock.map((item) =>
      item.rut === rut ? { ...item, estado: 'Aprobado' } : item
    );
  }

  rejectSolicitud(rut: string): void {
    this.vacacionesMock = this.vacacionesMock.map((item) =>
      item.rut === rut ? { ...item, estado: 'Rechazado' } : item
    );
  }
}