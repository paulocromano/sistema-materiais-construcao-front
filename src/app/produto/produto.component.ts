import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from '../shared/toasty/toasty.component';
import { ProdutoDTO } from './shared/model/produto.dto';
import { ProdutoService } from './shared/service/produto.service';
import { AtualizarProdutoFORM } from './shared/model/atualizar-produto.form';
import { ProdutoFORM } from './shared/model/produto.form';
import { CompraService } from './../compra/shared/service/compra.service';
import { CompraFORM } from './../compra/shared/model/compra.form';

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
  public mostrarDialogCompraProduto: boolean = false;

  public produtos: ProdutoDTO[];
  public produtoParaAtualizar = new AtualizarProdutoFORM(new ProdutoDTO);
  public produtoSelecionado = new ProdutoDTO();
  public novoProduto = new ProdutoFORM();
  public novaCompra = new CompraFORM();


  public tabViewItems = [
    { header: 'ID', field: 'id', style: 'col-id' },
    { header: 'Descrição', field: 'descricao', style: 'col-descricao' },
    { header: 'Preço R$', field: 'preco', style: 'col-preco' },
    { header: 'Estoque', field: 'estoque', style: 'col-estoque' },
    { header: 'Ações', field: 'acoes', style: 'col-acoes' }
  ];

  constructor(
    private produtoService: ProdutoService,
    private compraService: CompraService
  ) { }

  ngOnInit(): void {
    this.listarTodosProdutos();
  }


  public listarTodosProdutos(): void {
    this.processandoOperacao = true;

    this.produtoService.listarTodosProdutos()
      .subscribe(
        (produto: ProdutoDTO[]) => {
          this.produtos = produto;
        },
        (error: HttpErrorResponse) => {
          this.toasty.error(error);
        },
        () => this.processandoOperacao = false
      )
  }

  public abrirDialogParaAtualizarProduto(produto: ProdutoDTO): void {
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
          this.toasty.error(error);
        },
        () => this.processandoOperacao
      )
  } 

  public camposAtualizacaoProdutoEstaoValidos(): boolean {
    return !(this.produtoParaAtualizar.preco && this.produtoParaAtualizar.estoque);
  }

  public abrirDialogParaRemoverProduto(produto: ProdutoDTO): void {
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
          this.toasty.error(error);
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
          this.toasty.error(error);
        },
        () => this.processandoOperacao = false
      );

      this.novoProduto = new ProdutoFORM();
  }

  public camposCadastroProdutoEstaoValidos(): boolean {
    return !(this.novoProduto.descricao && this.novoProduto.preco && this.novoProduto.estoque);
  }

  public abrirDialogCompraProduto(produto: ProdutoDTO): void {
    this.mostrarDialogCompraProduto = true;
    this.produtoSelecionado = produto;
  }

  public atualizarPrecoTotalCompra(preco: string, quantidade: number): string {
    return (preco && quantidade) ? (parseFloat(preco) * quantidade).toFixed(2) : '0.00';
  }

  public camposCompraProdutoEstaoValidos(total: any): boolean {
    return !(this.novaCompra.quantidade && total !== '0.00');
  }

  public comprarProduto(): void {
    this.processandoOperacao = true;

    this.compraService.comprarProduto(this.produtoSelecionado.id, this.novaCompra)
      .subscribe(
        (success: any) => {
          this.toasty.success('Compra realizada com sucesso!');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.toasty.mostrarErrosDeValidacoes(error);
          }
          else {
            this.toasty.error('Erro ao comprar Produto!');
          } 
        },
        () => this.processandoOperacao = false
      );

      this.novaCompra = new CompraFORM();
  }
}
