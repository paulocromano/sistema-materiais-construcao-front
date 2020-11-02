import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaInicialComponent } from './pagina-inicial.component';

@NgModule({
  declarations: [ PaginaInicialComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [ PaginaInicialComponent ]
})
export class PaginaInicialModule { }
