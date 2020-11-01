import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastyModule } from './../shared/toasty/toasty.module';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';

import { ProdutoComponent } from './produto.component';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [
    ProdutoComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    TableModule,
    FormsModule,
    InputTextModule,
    TooltipModule,
    ProgressSpinnerModule,
    DialogModule,
    ToastyModule,
    DashboardModule
  ]
})

export class ProdutoModule { }
