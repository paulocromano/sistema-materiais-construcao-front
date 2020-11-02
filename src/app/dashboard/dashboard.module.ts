import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { DashboardComponent } from './dashboard.component';
import { ToastyModule } from '../shared/toasty/toasty.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    DialogModule,
    InputTextModule,
    RouterModule,
    ToastyModule
  ],
  exports: [ DashboardComponent ]
})
export class DashboardModule { }
