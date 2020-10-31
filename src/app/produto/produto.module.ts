import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoComponent } from './produto.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastyModule } from './../shared/toasty/toasty.module';

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
    ToastyModule
  ]
})

export class ProdutoModule { }
