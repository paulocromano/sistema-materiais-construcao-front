import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { ClienteDTO } from './shared/model/cliente.dto';
import { ClienteService } from './shared/service/cliente.service';
import { ClienteFORM } from './shared/model/cliente.form';
import { TokenService } from './../shared/service/token.service';

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
    private tokenService: TokenService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.temPermissaoDeADMIN()) {
      this.listarTodosClientes();
    }
    else {
      this.toasty.error('Acesso Negado!');
    }
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
    this.clienteSelecionado = cliente;
    this.mostrarDialogInformacoesCliente = true;
  }

  public abrirDialogComprasCliente(cliente: ClienteDTO): void {
    this.clienteSelecionado = cliente;
    this.mostrarDialogComprasCliente = true;
  }

  public abrirDialogPermissaoParaCliente(cliente: ClienteDTO): void {
    this.clienteSelecionado = cliente;
    this.mostrarDialogParaAdicionarPermissao = true;
  }

  public adicionarPermissaoAoCliente(): void {
    this.processandoOperacao = true;

    this.clienteService.adicionarPermissaoParaCliente(this.clienteSelecionado.id)
      .subscribe(
        (success: any) => {
          this.toasty.success(`O(A) Cliente ${this.clienteSelecionado.nome} agora tem permissão de ADMINISTRADOR!`)
          this.mostrarDialogParaAdicionarPermissao = false;
          this.processandoOperacao = false
          this.listarTodosClientes();
        },
        (error: HttpErrorResponse) => {
          this.processandoOperacao = false;
          this.toasty.error(error);
        });
  }

  public abrirDialogRemoverCliente(cliente: ClienteDTO): void {
    this.clienteSelecionado = cliente;
    this.mostrarDialogRemoverCliente = true;
  }

  public removerCliente(): void {
    this.processandoOperacao = true;

    this.clienteService.removerCliente(this.clienteSelecionado.id)
      .subscribe(
        (success: any) => {
          this.toasty.success(`Cliente ${this.clienteSelecionado.nome} removido(a) com sucesso!`);
          this.mostrarDialogRemoverCliente = false;
          this.listarTodosClientes();
        },
        (error: HttpErrorResponse) =>{
          this.toasty.error(error);
        },
        () => this.processandoOperacao = false
      );
  }
}
