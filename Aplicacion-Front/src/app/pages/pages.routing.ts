import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessComponent } from './progess/progess.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';



//Mantenimientos
import { AdministradoresComponent } from './mantenimientos/administradores/administradores.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { CrearMedicoComponent } from './mantenimientos/medicos/crear-medico.component';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { CrearIncidenciaComponent } from './incidencia/crear-incidencia.component';
import { PoliticaDatosComponent } from './politica-datos/politica-datos.component';
import { RegistrarPacientesComponent } from './mantenimientos/pacientes/registrar-pacientes.component';
import { PacientesComponent } from './mantenimientos/pacientes/pacientes.component';

//ng-router tab y haces un sniped

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dasboard' } },
            { path: 'progress', component: ProgessComponent, data: { titulo: 'ProgressBar' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
            { path: 'incidencias', component: IncidenciaComponent, data: { titulo: 'Incidencias' } },
            { path: 'crearIncidencia', component: CrearIncidenciaComponent, data: { titulo: 'Registrar Incidencias' } },
            { path: 'politica', component: PoliticaDatosComponent, data: { titulo: 'Politica de Datos' } },

            //Mantenimientos
            { path: 'administradores', component: AdministradoresComponent, data: { titulo: 'Administradores' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Editar Medico' } },
            { path: 'crearMedico', component: CrearMedicoComponent, data: { titulo: 'Registrar Medico' } },
            { path: 'medicos/registrarPaciente', component: RegistrarPacientesComponent, data: { titulo: 'Registrar Paciente' } },
            { path: 'medicos/listaPaciente', component: PacientesComponent, data: { titulo: 'Pacientes' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
