import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompraComponent } from './compra.component';
import { CompraService } from './shared/service/compra.service';

@NgModule({
  declarations: [ CompraComponent ],
  imports: [
    CommonModule
  ],
  providers: [ CompraService ]
})

export class CompraModule { }
