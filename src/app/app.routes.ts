import { Routes } from '@angular/router';
import { AppShellComponent } from './shared/layout/app-shell.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { DocumentosPageComponent } from './features/documentos/documentos-page.component';
import { EmpleadosPageComponent } from './features/empleados/empleados-page.component';
import { EmpresaFormComponent } from './features/empresa/empresa-form.component';
import { LiquidacionesPageComponent } from './features/liquidaciones/liquidaciones-page.component';
import { LoginPageComponent } from './features/auth/login-page.component';
import { VacacionesPageComponent } from './features/vacaciones/vacaciones-page.component';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{
		path: '',
		component: AppShellComponent,
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
			{ path: 'dashboard', component: DashboardPageComponent },
			{ path: 'empresa', component: EmpresaFormComponent },
			{ path: 'empleados', component: EmpleadosPageComponent },
			{ path: 'liquidaciones', component: LiquidacionesPageComponent },
			{ path: 'vacaciones', component: VacacionesPageComponent },
			{ path: 'documentos', component: DocumentosPageComponent },
		],
	},
	{ path: '**', redirectTo: 'dashboard' },
];
