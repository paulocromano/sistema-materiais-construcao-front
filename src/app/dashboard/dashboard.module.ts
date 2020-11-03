import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

import { DashboardComponent } from './dashboard.component';
import { ToastyModule } from '../shared/toasty/toasty.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    RouterModule,
    TabViewModule,
    TableModule,
    ToastyModule
  ],
  exports: [ DashboardComponent ]
})
export class DashboardModule { }
