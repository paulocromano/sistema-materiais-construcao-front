import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { PerfilComponent } from './perfil.component';
import { ToastyModule } from './../shared/toasty/toasty.module';

@NgModule({
  declarations: [ PerfilComponent ],
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ToastyModule
  ],
  exports: [ PerfilComponent ]
})

export class PerfilModule { }
