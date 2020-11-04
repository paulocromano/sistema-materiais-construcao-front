import { AtualizarClienteFORM } from './../cliente/shared/model/atualizar-cliente.form';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../shared/service/auth.service';
import { TokenService } from './../shared/service/token.service';
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
  public processandoOperacao: boolean = false;
  public indexTabViewPerfil: number = 0;

  public cliente = new ClienteDTO();
  public atualizarCliente = new AtualizarClienteFORM();

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.usuarioEstaLogado = this.authService.usuarioEstaLogado();

    if (this.usuarioEstaLogado) {
      this.usuarioTemPermissaoDeADMIN = this.tokenService.temPermissaoDeADMIN();
    }
  }

  public logout(): void {
    this.authService.logout();   
    this.router.navigate(['']);
  }

  public abrirDialogPerfil(): void {
    if (this.usuarioEstaLogado) {
      this.carregarInformacoesDoClienteLogado();
      this.abrirDialogPerfilCliente = true;
    }
  }

  private carregarInformacoesDoClienteLogado(): void {
    if (this.authService.usuarioEstaLogado()) {
      this.processandoOperacao = true;

      this.clienteService.buscarClienteLogado(this.tokenService.getIDCliente())
        .subscribe(
          (cliente: ClienteDTO) => {
            this.cliente = cliente;
            this.atualizarCliente = new AtualizarClienteFORM(cliente.telefone);
            this.processandoOperacao = false;
          },
          (error: HttpErrorResponse) => {
            this.toasty.error(error);
            this.processandoOperacao = false;
          });
    }
  }

  public atualizarPerfilCliente(): void {
    this.processandoOperacao = true;

    this.clienteService.atualizarCliente(this.tokenService.getIDCliente(), this.atualizarCliente)
      .subscribe(
        (cliente: ClienteDTO) => {
          this.cliente = cliente;
          this.atualizarCliente = new AtualizarClienteFORM(cliente.telefone);
          this.toasty.success('Informações atualizadas com sucesso!');
          this.processandoOperacao = false;
          this.indexTabViewPerfil = 0;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.toasty.mostrarErrosDeValidacoes(error);
          }
          else {
            this.toasty.error(error);
          }
      
          this.processandoOperacao = false;
        }
      );
  }

  public camposAtualizacaoPerfilEstaoValidos(): boolean {
    return !(this.atualizarCliente.telefone && this.atualizarCliente.senha);
  }

  public handleChange(event): void {
    this.indexTabViewPerfil = event.index;
  }
}
