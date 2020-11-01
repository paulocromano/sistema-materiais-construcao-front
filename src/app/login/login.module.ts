import { ToastyModule } from './../shared/toasty/toasty.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './login.component';
import { DashboardModule } from './../dashboard/dashboard.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ToastyModule,
    DashboardModule
  ]
})
export class LoginModule { }
