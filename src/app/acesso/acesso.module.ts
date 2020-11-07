import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';

import { ToastyModule } from '../shared/toasty/toasty.module';
import { DashboardModule } from './../dashboard/dashboard.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    MessageModule,
    ToastyModule,
    DashboardModule
  ]
})

export class AcessoModule { }
