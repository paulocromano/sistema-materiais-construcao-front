import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './produto/produto.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'produto', component: ProdutoComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
