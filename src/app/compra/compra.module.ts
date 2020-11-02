import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';

import { CompraComponent } from './compra.component';
import { CompraService } from './shared/service/compra.service';
import { ToastyModule } from './../shared/toasty/toasty.module';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [ CompraComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ToastyModule,
    DashboardModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    TooltipModule,
    ProgressSpinnerModule,
    DialogModule
  ],
  providers: [ CompraService ]
})

export class CompraModule { }
