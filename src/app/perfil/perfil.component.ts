import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ClienteService } from './../cliente/shared/service/cliente.service';
import { TokenService } from './../shared/service/token.service';
import { ClienteDTO } from './../cliente/shared/model/cliente.dto';
import { ToastyComponent } from './../shared/toasty/toasty.component';
import { AuthService } from './../shared/service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  
  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  @Input() 
  public abrirDialogPerfilCliente: boolean = false;

  public cliente = new ClienteDTO();
  public processandooOperacao: boolean = false; 

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
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
