import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';


//ng g m shared/shared --flat

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule
  ]
})
export class SharedModule { }
