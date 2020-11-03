import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './produto/produto.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { CompraComponent } from './compra/compra.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
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
