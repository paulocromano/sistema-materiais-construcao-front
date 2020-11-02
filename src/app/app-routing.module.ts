import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './produto/produto.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ClienteComponent } from './cliente/cliente.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './login/login.component';
import { CompraComponent } from './compra/compra.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'produto', component: ProdutoComponent, canActivate: [AuthGuard] },
  { path: 'compra', component: CompraComponent, canActivate: [AuthGuard] },
  { path: '**', component: PaginaInicialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
