import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoComponent } from './produto.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastyModule } from './../shared/toasty/toasty.module';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {DialogModule} from 'primeng/dialog';

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
    ToastyModule
  ]
})

export class ProdutoModule { }
