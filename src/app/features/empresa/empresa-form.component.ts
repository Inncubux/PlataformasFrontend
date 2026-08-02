import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Importaciones de NG-ZORRO necesarias para la UI
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule
  ],
  template: `
    <div class="empresa-page">
      <header class="empresa-header">
        <div>
          <h2>Gestión de Empresa</h2>
          <p>Configuración general y parámetros legales</p>
        </div>

        <button nz-button class="save-button" (click)="guardarCambios()">
          <span nz-icon nzType="save" class="button-icon"></span>
          <span>Guardar Cambios</span>
        </button>
      </header>

      <section aria-label="Datos de Empresa">
        <nz-card class="empresa-card" [nzBordered]="false">
          
          <div class="profile-header">
            <div class="profile-icon">
              <span nz-icon nzType="shop" class="section-icon"></span>
            </div>
            <div>
              <h3>Perfil de Empresa</h3>
              <p>Información legal y datos corporativos</p>
            </div>
          </div>

          <form nz-form [formGroup]="empresaForm" nzLayout="vertical" class="empresa-form">
            
            <div nz-row [nzGutter]="24">
              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>RUT Empresa</nz-form-label>
                  <nz-form-control nzErrorTip="Ingrese un RUT válido">
                    <input nz-input formControlName="rutEmpresa" placeholder="76.123.456-7" />
                  </nz-form-control>
                </nz-form-item>
              </div>

              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Razón Social</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <input nz-input formControlName="razonSocial" placeholder="Empresa Demo SpA" />
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>

            <div nz-row [nzGutter]="24">
              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Giro</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <input nz-input formControlName="giro" placeholder="Comercio al por menor" />
                  </nz-form-control>
                </nz-form-item>
              </div>

              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Código Actividad Económica SII</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <input nz-input formControlName="codigoSii" placeholder="477300" />
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>

            <div nz-row>
              <div nz-col [nzSpan]="24">
                <nz-form-item>
                  <nz-form-label nzRequired>Dirección</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <input nz-input formControlName="direccion" placeholder="Av. Providencia 1234, Of. 506" />
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>

            <div nz-row [nzGutter]="24">
              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Comuna</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <nz-select formControlName="comuna" nzPlaceHolder="Seleccione una comuna">
                      <nz-option nzValue="Providencia" nzLabel="Providencia"></nz-option>
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </div>

              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Región</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <nz-select formControlName="region" nzPlaceHolder="Seleccione una región">
                      <nz-option nzValue="Metropolitana" nzLabel="Metropolitana"></nz-option>
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>

            <div nz-row [nzGutter]="24">
              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Representante Legal - Nombre</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <input nz-input formControlName="repLegalNombre" placeholder="Juan Pérez Rodríguez" />
                  </nz-form-control>
                </nz-form-item>
              </div>

              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Representante Legal - RUT</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <input nz-input formControlName="repLegalRut" placeholder="12.345.678-9" />
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>

            <div nz-row [nzGutter]="24">
              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Mutual de Seguridad</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <nz-select formControlName="mutual" nzPlaceHolder="Seleccione mutual">
                      <nz-option nzValue="ACHS" nzLabel="ACHS"></nz-option>
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </div>

              <div nz-col [nzXs]="24" [nzMd]="12">
                <nz-form-item>
                  <nz-form-label nzRequired>Caja de Compensación</nz-form-label>
                  <nz-form-control nzErrorTip="Requerido">
                    <nz-select formControlName="ccaf" nzPlaceHolder="Seleccione caja">
                      <nz-option nzValue="Los Andes" nzLabel="Los Andes"></nz-option>
                    </nz-select>
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>

            <div nz-row>
              <div nz-col [nzSpan]="24">
                <nz-form-item>
                  <nz-form-label>Logo de la Empresa</nz-form-label>
                  <nz-form-control>
                    <nz-upload
                      nzType="drag"
                      nzMultiple="false"
                      nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      class="custom-upload"
                    >
                      <p class="ant-upload-drag-icon">
                        <span nz-icon nzType="inbox" class="upload-icon"></span>
                      </p>
                      <p class="ant-upload-text">Haz clic para subir o arrastra una imagen aquí</p>
                      <p class="ant-upload-hint">PNG, JPG o SVG (máx. 2MB)</p>
                    </nz-upload>
                  </nz-form-control>
                </nz-form-item>
              </div>
            </div>

          </form>
        </nz-card>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding-bottom: 24px;
    }

    .empresa-page {
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* --- CABECERA PRINCIPAL --- */
    .empresa-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 8px;
    }

    .empresa-header h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .empresa-header p {
      margin: 4px 0 0;
      color: #64748b;
      font-size: 0.95rem;
    }

    /* Botón Guardar Cambios */
    .save-button {
      background: #2563eb;
      color: #ffffff;
      border: none;
      padding: 0 24px;
      height: 44px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-width: 180px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
    }

    .save-button:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
    }

    .button-icon { font-size: 18px; }

    /* --- MODIFICANDO NG-ZORRO CARD --- */
    ::ng-deep .empresa-card.ant-card {
      border-radius: 20px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
      overflow: hidden;
    }

    ::ng-deep .empresa-card > .ant-card-body {
      padding: 32px;
    }

    /* Encabezado interno del Perfil */
    .profile-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f1f5f9;
    }

    .profile-icon {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: #eff6ff; 
      color: #2563eb;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .section-icon { font-size: 26px; }

    .profile-header h3 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 700;
      color: #1e293b;
    }

    .profile-header p {
      margin: 4px 0 0;
      color: #64748b;
      font-size: 0.9rem;
    }

    /* --- MODIFICANDO INPUTS Y SELECTS DE NG-ZORRO --- */
    ::ng-deep .empresa-form .ant-form-item-label > label {
      font-weight: 600;
      color: #475569;
      font-size: 0.9rem;
    }

    ::ng-deep .empresa-form .ant-input,
    ::ng-deep .empresa-form .ant-select-selector {
      border-radius: 10px !important;
      padding: 10px 14px !important;
      height: auto !important;
      background-color: #f8fafc !important;
      border-color: #e2e8f0 !important;
      font-size: 0.95rem !important;
      color: #0f172a !important;
      box-shadow: none !important;
      transition: all 0.2s ease;
    }

    ::ng-deep .empresa-form .ant-input:focus,
    ::ng-deep .empresa-form .ant-input:hover,
    ::ng-deep .empresa-form .ant-select-selector:focus-within,
    ::ng-deep .empresa-form .ant-select:hover .ant-select-selector {
      background-color: #ffffff !important;
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
    }

    ::ng-deep .empresa-form .ant-select-selection-item,
    ::ng-deep .empresa-form .ant-select-selection-placeholder {
      line-height: normal !important;
      display: flex;
      align-items: center;
    }

    /* --- MODIFICANDO UPLOAD DE NG-ZORRO --- */
    ::ng-deep .custom-upload .ant-upload.ant-upload-drag {
      border-radius: 16px;
      background-color: #f8fafc;
      border: 2px dashed #cbd5e1;
      transition: all 0.2s ease;
    }

    ::ng-deep .custom-upload .ant-upload.ant-upload-drag:hover {
      border-color: #3b82f6;
      background-color: #eff6ff;
    }

    .upload-icon {
      font-size: 32px;
      color: #2563eb;
    }

    @media (max-width: 768px) {
      .empresa-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .save-button { width: 100%; }
      ::ng-deep .empresa-card > .ant-card-body { padding: 24px 16px; }
    }
  `]
})
export class EmpresaFormComponent {
  private fb = inject(FormBuilder);

  empresaForm = this.fb.group({
    rutEmpresa: ['', [Validators.required]],
    razonSocial: ['', [Validators.required]],
    giro: ['', [Validators.required]],
    codigoSii: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    comuna: [null as string | null, [Validators.required]],
    region: [null as string | null, [Validators.required]],
    repLegalNombre: ['', [Validators.required]],
    repLegalRut: ['', [Validators.required]],
    mutual: [null as string | null, [Validators.required]],
    ccaf: [null as string | null, [Validators.required]]
  });

  guardarCambios() {
    if (this.empresaForm.valid) {
      console.log('Formulario válido, enviando:', this.empresaForm.value);
    } else {
      Object.values(this.empresaForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}