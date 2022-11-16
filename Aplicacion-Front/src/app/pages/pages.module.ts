import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



//  Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';


//  Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessComponent } from './progess/progess.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdministradoresComponent } from './mantenimientos/administradores/administradores.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgessComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    AdministradoresComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
  ],
  exports: [
    DashboardComponent,
    ProgessComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    //PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule

  ]
})
export class PagesModule { }
