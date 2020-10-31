import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoComponent } from './produto.component';
import {TabViewModule} from 'primeng/tabview';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    ProdutoComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    PaginatorModule
  ]
})

export class ProdutoModule { }
