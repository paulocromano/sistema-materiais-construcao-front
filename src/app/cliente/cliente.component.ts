import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { ClienteDTO } from './shared/model/cliente.dto';
import { ClienteService } from './shared/service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

export class ClienteComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public pesquisa: string;

  public processandoOperacao: boolean = false;
  public mostrarDialogCadastroCliente: boolean = false;

  public clientes: ClienteDTO[];

  public tabViewItems = [
    { header: 'ID', field: 'id', style: 'col-id' },
    { header: 'Nome', field: 'nome', style: 'col-nome' },
    { header: 'Data de Nascimento', field: 'dataNascimento', style: 'col-dataNascimento' },
    { header: 'Telefone', field: 'telefone', style: 'col-telefone' },
    { header: 'Ações', field: 'acoes', style: 'col-acoes' }
  ];

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.listarTodosClientes();
  }

  public listarTodosClientes(): void {
    this.processandoOperacao = true;

    this.clienteService.listarTodosClientes()
      .subscribe(
        (cliente: ClienteDTO[]) => {
          this.clientes = cliente;
        },
        (error: HttpErrorResponse) => {
          this.toasty.error(error);
        },
        () => this.processandoOperacao = false
      );
  }
}
