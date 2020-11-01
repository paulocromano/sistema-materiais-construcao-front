import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from '../shared/toasty/toasty.component';
import { Produto } from './shared/model/produto.model';
import { ProdutoService } from './shared/service/produto.service';
import { AtualizarProdutoFORM } from './shared/model/atualizar-produto.form';
import { ProdutoFORM } from './shared/model/produto.form';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public pesquisa: string;
  public processandoOperacao: boolean = false;
  public mostrarDialogAtualizacaoProduto: boolean = false;
  public mostrarDialogRemoverProduto: boolean = false;
  public mostrarDialogCadastroProduto: boolean = false;

  public produtos: Produto[];
  public produtoParaAtualizar = new AtualizarProdutoFORM(new Produto);
  public produtoSelecionado = new Produto();
  public novoProduto = new ProdutoFORM();


  public tabViewItems = [
    { header: 'ID', field: 'id', style: 'col-id' },
    { header: 'Descrição', field: 'descricao', style: 'col-descricao' },
    { header: 'Preço R$', field: 'preco', style: 'col-preco' },
    { header: 'Estoque', field: 'estoque', style: 'col-estoque' },
    { header: 'Ações', field: 'acoes', style: 'col-acoes' }
  ];

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.listarTodosProdutos();
  }


  public listarTodosProdutos(): void {
    this.processandoOperacao = true;

    this.produtoService.listarTodosProdutos()
      .subscribe(
        (produto: Produto[]) => {
          this.produtos = produto;
        },
        (error: HttpErrorResponse) => {
          this.toasty.error(this.mensagemDoErro(error));
        },
        () => this.processandoOperacao = false
      )
  }

  public abrirDialogParaAtualizarProduto(produto: Produto): void {
    this.mostrarDialogAtualizacaoProduto = true;
    this.produtoSelecionado = produto;
    this.produtoParaAtualizar = new AtualizarProdutoFORM(produto);
  }

  public atualizarProduto(): void {
    this.processandoOperacao = true;

    this.produtoService.atualizarProduto(this.produtoSelecionado.id, this.produtoParaAtualizar)
      .subscribe(
        (success: any) => {
          this.toasty.success('Produto atualizado com sucesso!');
          this.mostrarDialogAtualizacaoProduto = false;
          this.listarTodosProdutos();  
        },
        (error: HttpErrorResponse) => {
          this.toasty.error(this.mensagemDoErro(error));
        },
        () => this.processandoOperacao
      )
  } 

  public camposAtualizacaoProdutoEstaoValidos(): boolean {
    return !(this.produtoParaAtualizar.preco && this.produtoParaAtualizar.estoque);
  }

  public abrirDialogParaRemoverProduto(produto: Produto): void {
    this.mostrarDialogRemoverProduto = true;
    this.produtoSelecionado = produto;
  }

  public removerProduto(): void {
    this.processandoOperacao = true;

    this.produtoService.removerProduto(this.produtoSelecionado.id)
      .subscribe(
        (success: any) => {
          this.toasty.success('Produto removido com sucesso!');
          this.mostrarDialogRemoverProduto = false;
          this.listarTodosProdutos();
        },
        (error: HttpErrorResponse) => {
          this.toasty.error(this.mensagemDoErro(error));
        },
        () => this.processandoOperacao = false
      );
  }

  public cadastrarProduto(): void {
    this.processandoOperacao = true;

    this.produtoService.cadastrarProduto(this.novoProduto)
      .subscribe(
        (success: any) => {
          this.toasty.success('Produto cadastrado com sucesso!');
          this.mostrarDialogCadastroProduto = false;
          this.listarTodosProdutos();
        },
        (error: HttpErrorResponse) => {
          this.toasty.error(this.mensagemDoErro(error));
        },
        () => this.processandoOperacao = false
      );
  }

  public camposCadastroProdutoEstaoValidos(): boolean {
    return !(this.novoProduto.descricao && this.novoProduto.preco && this.novoProduto.estoque);
  }

  private mensagemDoErro(erro: HttpErrorResponse): string {
    return JSON.parse(erro.error).message;
  }
}
