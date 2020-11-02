import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../shared/service/auth.service';
import { TokenService } from './../shared/service/token.service';
import { PermissaoCliente } from './../shared/model/permissao-cliente';
import { ClienteDTO } from './../cliente/shared/model/cliente.dto';
import { ClienteService } from './../cliente/shared/service/cliente.service';
import { ToastyComponent } from './../shared/toasty/toasty.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  private toasty: ToastyComponent

  public usuarioEstaLogado: boolean = false;
  public usuarioTemPermissaoDeADMIN: boolean = false;
  public abrirDialogPerfilCliente: boolean = false;

  public cliente = new ClienteDTO();
  public processandooOperacao: boolean = false; 

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private clienteService: ClienteService,
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
      this.carregarInformacoesDoClienteLogado();
    }
  }

  public carregarInformacoesDoClienteLogado(): void {
    if (this.authService.usuarioEstaLogado()) {
      this.processandooOperacao = true;
      console.log(this.tokenService.getIDCliente());

      this.clienteService.buscarClienteLogado(this.tokenService.getIDCliente())
        .subscribe(
          (cliente: ClienteDTO) => {
            this.cliente = cliente;
          },
          (error: HttpErrorResponse) => {
            this.toasty.error(error);
          },
          () => this.processandooOperacao = false
        );
    }
  }
}
