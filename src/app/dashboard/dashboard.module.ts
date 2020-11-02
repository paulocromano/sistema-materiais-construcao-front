import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';

import { DashboardComponent } from './dashboard.component';
import { PerfilModule } from './../perfil/perfil.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    RouterModule,
    PerfilModule
  ],
  exports: [ DashboardComponent ]
})
export class DashboardModule { }
