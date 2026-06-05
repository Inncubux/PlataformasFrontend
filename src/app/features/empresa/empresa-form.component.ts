import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importaciones de NG-ZORRO (Ant Design para Angular)
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon'; 

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzUploadModule,
    NzIconModule
  ],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.css',
})
export class EmpresaFormComponent implements OnInit {
  empresaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.empresaForm = this.fb.group({
      rutEmpresa: ['76.123.456-7', [Validators.required]],
      razonSocial: ['Empresa Demo SpA', [Validators.required]],
      giro: ['Comercio al por menor', [Validators.required]],
      codigoSii: ['477300', [Validators.required]],
      direccion: ['Av. Providencia 1234, Of. 506', [Validators.required]],
      comuna: ['Providencia', [Validators.required]],
      region: ['Metropolitana', [Validators.required]],
      repLegalNombre: ['Juan Pérez Rodríguez', [Validators.required]],
      repLegalRut: ['12.345.678-9', [Validators.required]],
      mutual: ['ACHS', [Validators.required]],
      ccaf: ['Los Andes', [Validators.required]],
      logo: [null]
    });
  }

  guardarCambios(): void {
    if (this.empresaForm.valid) {
      console.log('Payload listo para conectar con endpoints de Pamela:', this.empresaForm.value);
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