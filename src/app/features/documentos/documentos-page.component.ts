import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos de NG-ZORRO
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-documentos-page',
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
          <h1 class="page-title">Documentos y Firmas</h1>
          <p class="page-subtitle">Gestión de documentos legales y firmas electrónicas</p>
        </div>
        <div class="actions">
          <button nz-button class="btn-secondary">
            <span nz-icon nzType="safety-certificate" nzTheme="outline"></span>
            Verificar Hash
          </button>
          <button nz-button nzType="primary" class="btn-primary">
            <span nz-icon nzType="upload" nzTheme="outline"></span>
            Subir Documento
          </button>
        </div>
      </section>

      <section class="alert-card warning-card">
        <h3 class="alert-title">Contratos por Vencer</h3>
        <p class="alert-desc">2 contrato(s) vencen en los próximos 15 días</p>
        <ul class="alert-list">
          <li>Pedro Sánchez - Vence el 28/04/2026 (12 días)</li>
          <li>Laura Ramírez - Vence el 30/04/2026 (14 días)</li>
        </ul>
      </section>

      <section class="summary-grid">
        <article class="summary-card">
          <span>Total Documentos</span>
          <strong class="dark">4</strong>
        </article>
        <article class="summary-card">
          <span>Firmados</span>
          <strong class="green">3</strong>
        </article>
        <article class="summary-card">
          <span>Pendientes</span>
          <strong class="orange">1</strong>
        </article>
        <article class="summary-card">
          <span>Este Mes</span>
          <strong class="blue">1</strong>
        </article>
      </section>

      <section class="alert-card info-card">
        <h3 class="alert-title">Seguridad de Documentos</h3>
        <p class="alert-desc">
          Todos los documentos firmados generan un hash SHA-256 único para garantizar su integridad. 
          Si un documento es alterado después de firmarse, el hash no coincidirá y se detectará la manipulación.
        </p>
      </section>

      <section class="table-shell">
        <nz-table #docsTable [nzData]="documentosMock" [nzShowPagination]="false" nzSize="middle">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Empleado</th>
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Hash</th>
              <th nzAlign="right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (doc of docsTable.data; track doc.empleado) {
              <tr>
                <td class="td-strong">{{ doc.documento }}</td>
                <td class="td-muted">{{ doc.empleado }}</td>
                <td>
                  <nz-tag class="custom-tag tag-blue">{{ doc.tipo }}</nz-tag>
                </td>
                <td>{{ doc.fecha }}</td>
                <td>
                  @if (doc.estado === 'Firmado') {
                    <nz-tag class="status-tag tag-success">Firmado</nz-tag>
                  } @else {
                    <nz-tag class="status-tag tag-warning">Pendiente</nz-tag>
                  }
                </td>
                <td class="td-hash">{{ doc.hash }}</td>
                <td nzAlign="right" class="action-links">
                  <a>Ver</a> 
                  <span class="divider">·</span> 
                  @if (doc.estado === 'Firmado') {
                    <a>Descargar</a>
                  } @else {
                    <a>Firmar</a>
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

    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

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

    /* --- ALERTAS COMPARTIDAS --- */
    .alert-card {
      border-radius: 16px;
      padding: 20px 24px;
      border: 1px solid transparent;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }

    .alert-title {
      margin: 0 0 4px 0;
      font-weight: 700;
      font-size: 1.05rem;
    }

    .alert-desc {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    /* Alerta Naranja (Warning) */
    .warning-card {
      background: #fff7ed;
      border-color: #fdba74;
    }
    .warning-card .alert-title { color: #9a3412; }
    .warning-card .alert-desc { color: #c2410c; }
    .alert-list {
      margin: 10px 0 0;
      padding-left: 24px;
      color: #9a3412;
      font-weight: 600;
      font-size: 0.9rem;
    }

    /* Alerta Azul (Info) */
    .info-card {
      background: #eff6ff;
      border-color: #bfdbfe;
    }
    .info-card .alert-title { color: #1e3a8a; }
    .info-card .alert-desc { color: #1d4ed8; }

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
      padding: 8px;
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
    .td-muted { color: #64748b; }
    .td-hash { color: #94a3b8; font-family: monospace; font-size: 0.9rem; }

    /* --- ETIQUETAS (TAGS) --- */
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
      .actions { width: 100%; }
      .actions button { flex: 1; justify-content: center; }
      ::ng-deep .ant-table { overflow-x: auto; display: block; }
    }
  `]
})
export class DocumentosPageComponent {
  readonly documentosMock = [
    {
      documento: 'Contrato Juan Pérez',
      empleado: 'Juan Pérez Rodríguez',
      tipo: 'Contrato',
      fecha: '14-01-2026',
      estado: 'Firmado',
      hash: 'a45b6cd7e8f9...'
    },
    {
      documento: 'Liquidación Marzo - María González',
      empleado: 'María González Silva',
      tipo: 'Liquidación',
      fecha: '30-03-2026',
      estado: 'Firmado',
      hash: 'b5cd1e8e19d9...'
    },
    {
      documento: 'Anexo Modificación Sueldo - Carlos Muñoz',
      empleado: 'Carlos Muñoz López',
      tipo: 'Anexo',
      fecha: '31-03-2026',
      estado: 'Pendiente',
      hash: 'sin hash'
    },
    {
      documento: 'Solicitud Vacaciones - Ana Martínez',
      empleado: 'Ana Martínez Torres',
      tipo: 'Vacaciones',
      fecha: '09-04-2026',
      estado: 'Firmado',
      hash: 'c6d7e8f9g0h1...'
    }
  ];
}