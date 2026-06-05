import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-documentos-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <h1>Documentos y Firmas</h1>
        <p>Gestión de documentos legales y firmas electrónicas</p>
      </div>
      <div class="actions">
        <button class="secondary">Verificar Hash</button>
        <button class="primary">Subir Documento</button>
      </div>
    </section>

    <section class="warning-card">
      <strong>Contratos por Vencer</strong>
      <p>2 contrato(s) vencen en los próximos 15 días</p>
      <ul>
        <li>Pedro Sánchez - Vence el 28/04/2026 (12 días)</li>
        <li>Laura Ramírez - Vence el 30/04/2026 (14 días)</li>
      </ul>
    </section>

    <section class="summary-grid">
      <article class="summary-card"><span>Total Documentos</span><strong>4</strong></article>
      <article class="summary-card"><span>Firmados</span><strong class="green">3</strong></article>
      <article class="summary-card"><span>Pendientes</span><strong class="orange">1</strong></article>
      <article class="summary-card"><span>Este Mes</span><strong class="blue">1</strong></article>
    </section>

    <section class="info-card">
      <h3>Seguridad de Documentos</h3>
      <p>
        Todos los documentos firmados generan un hash SHA-256 único para garantizar su integridad.
        Si un documento es alterado después de firmarse, el hash no coincidirá y se detectará la manipulación.
      </p>
    </section>

    <section class="table-shell">
      <table>
        <thead>
          <tr>
            <th>Documento</th><th>Empleado</th><th>Tipo</th><th>Fecha</th><th>Estado</th><th>Hash</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contrato Juan Pérez</td><td>Juan Pérez Rodríguez</td><td><span class="tag blue">Contrato</span></td><td>14-01-2026</td><td><span class="state ok">Firmado</span></td><td class="hash">a45b6cd7e8f9...</td><td>Ver · Descargar</td>
          </tr>
          <tr>
            <td>Liquidación Marzo - María González</td><td>María González Silva</td><td><span class="tag blue">Liquidación</span></td><td>30-03-2026</td><td><span class="state ok">Firmado</span></td><td class="hash">b5cd1e8e19d9...</td><td>Ver · Descargar</td>
          </tr>
          <tr>
            <td>Anexo Modificación Sueldo - Carlos Muñoz</td><td>Carlos Muñoz López</td><td><span class="tag blue">Anexo</span></td><td>31-03-2026</td><td><span class="state warn">Pendiente</span></td><td class="hash">sin hash</td><td>Ver · Firmar</td>
          </tr>
          <tr>
            <td>Solicitud Vacaciones - Ana Martínez</td><td>Ana Martínez Torres</td><td><span class="tag blue">Vacaciones</span></td><td>09-04-2026</td><td><span class="state ok">Firmado</span></td><td class="hash">c6d7e8f9g0h1...</td><td>Ver · Descargar</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    :host { display: grid; gap: 16px; }
    .page-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
    .page-head h1, .page-head p, .warning-card p, .warning-card strong, .info-card h3, .info-card p { margin: 0; }
    .page-head p { color: #64748b; margin-top: 6px; }
    .actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .actions button { border: 0; border-radius: 14px; padding: 14px 16px; font-weight: 700; }
    .actions .primary { color: #fff; background: linear-gradient(135deg, #2563eb, #1d4ed8); }
    .actions .secondary { background: #fff; border: 1px solid rgba(148, 163, 184, 0.25); }
    .warning-card, .summary-card, .info-card, .table-shell { border-radius: 18px; background: #fff; border: 1px solid rgba(148,163,184,.2); box-shadow: 0 12px 34px rgba(15,23,42,.08); }
    .warning-card { padding: 16px 18px; background: #fff7ed; border-color: #fdba74; }
    .warning-card ul { margin: 10px 0 0; padding-left: 18px; color: #9a3412; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .summary-card { padding: 16px 18px; display: grid; gap: 8px; }
    .summary-card span { color: #64748b; font-size: .88rem; }
    .summary-card strong { font-size: 1.7rem; }
    .green { color: #16a34a; } .orange { color: #f97316; } .blue { color: #2563eb; }
    .info-card { padding: 16px 18px; background: #eff6ff; border-color: #bfdbfe; }
    .info-card p { margin-top: 8px; color: #37517e; line-height: 1.55; }
    .table-shell { padding: 14px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 14px 10px; border-bottom: 1px solid rgba(148,163,184,.14); }
    th { color: #1e293b; font-size: .88rem; }
    td { color: #334155; font-size: .93rem; }
    .tag, .state { display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px; font-size: .8rem; font-weight: 700; }
    .tag.blue { background: #dbeafe; color: #2563eb; }
    .state.ok { background: #dcfce7; color: #15803d; } .state.warn { background: #ffedd5; color: #c2410c; }
    .hash { color: #94a3b8; font-size: .85rem; }
    @media (max-width: 1100px) { .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } table { display: block; overflow-x: auto; } }
  `]
})
export class DocumentosPageComponent {}
