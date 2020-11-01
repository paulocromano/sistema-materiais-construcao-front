import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardModule } from './../dashboard/dashboard.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';

import { ToastyModule } from './../shared/toasty/toasty.module';
import { ClienteComponent } from './cliente.component';
import { ClienteService } from './shared/service/cliente.service';

@NgModule({
  declarations: [
    ClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    TooltipModule,
    ProgressSpinnerModule,
    DialogModule,
    ToastyModule
  ],
  providers: [ ClienteService ]
})

export class ClienteModule { }
