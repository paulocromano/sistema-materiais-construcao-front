import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../shared/service/auth.service';
import { TokenService } from './../shared/service/token.service';
import { PermissaoCliente } from './../shared/model/permissao-cliente';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public usuarioEstaLogado: boolean = false;
  public usuarioTemPermissaoDeADMIN: boolean = false;
  public abrirDialogPerfilCliente: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.usuarioEstaLogado = this.authService.usuarioEstaLogado();
    this.usuarioTemPermissaoDeADMIN = this.tokenService.temPermissao(PermissaoCliente.ADMIN)
  }

  public logout(): void {
    this.authService.logout();   
    this.router.navigate(['']);
  }

  public abrirDialogPerfil(): void {
    if (this.usuarioEstaLogado) {
      this.abrirDialogPerfilCliente = true;
    }
  }
}
