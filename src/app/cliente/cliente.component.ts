import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { ClienteDTO } from './shared/model/cliente.dto';
import { ClienteService } from './shared/service/cliente.service';
import { ClienteFORM } from './shared/model/cliente.form';

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
  public mostrarDialogInformacoesCliente: boolean = false;
  public mostrarDialogComprasCliente: boolean = false;
  public mostrarDialogParaAdicionarPermissao: boolean = false;
  public mostrarDialogRemoverCliente: boolean = false;

  public clientes: ClienteDTO[];
  public cadastro = new ClienteFORM();
  public clienteSelecionado = new ClienteDTO();

  public tabViewCliente = [
    { header: 'ID', field: 'id', style: 'col-id' },
    { header: 'Nome', field: 'nome', style: 'col-nome' },
    { header: 'Data de Nascimento', field: 'dataNascimento', style: 'col-dataNascimento' },
    { header: 'Telefone', field: 'telefone', style: 'col-telefone' },
    { header: 'Ações', field: 'acoes', style: 'col-acoes' }
  ];

  public tabViewCompra = [
    { header: 'ID', field: 'id', style: 'col-id' },
    { header: 'Produto', field: 'produto', style: 'col-produto' },
    { header: 'Quantidade', field: 'quantidade', style: 'col-quantidade' },
    { header: 'Preço R$', field: 'preco', style: 'col-preco' },
    { header: 'Total R$', field: 'total', style: 'col-total' }
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

  public cadastrarCliente(): void {
    this.processandoOperacao = true;

    this.clienteService.cadastrarUsuario(this.cadastro)
      .subscribe(
        (success: any) => {
          this.toasty.success(`usuario cadastrado com sucesso!`);
          this.processandoOperacao = false;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.toasty.mostrarErrosDeValidacoes(error);
          }
          else {
            this.toasty.error('Houve um erro ao efetuar o Cadastro!')
          }

          this.processandoOperacao = false;
      });

    this.cadastro = new ClienteFORM();
  }

  public camposCadastroClienteEstaoValidos(): boolean {
    return !(this.cadastro.nome && this.cadastro.dataNascimento && this.cadastro.email && this.cadastro.senha);
  }

  public abrirDialogInformacoesCliente(cliente: ClienteDTO): void {
    this.mostrarDialogInformacoesCliente = true;
    this.clienteSelecionado = cliente;
  }

  public abrirDialogComprasCliente(cliente: ClienteDTO): void {
    this.mostrarDialogComprasCliente = true;
    this.clienteSelecionado = cliente;
  }
}
