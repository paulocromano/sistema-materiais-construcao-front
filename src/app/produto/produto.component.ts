import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from '../shared/toasty/toasty.component';
import { Produto } from './shared/model/produto.model';
import { ProdutoService } from './shared/service/produto.service';

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

  public produtos: Produto[];


  public tabViewItems = [
    { header: 'ID', field: 'id', style: 'col-id' },
    { header: 'Descrição', field: 'descricao', style: 'col-descricao' },
    { header: 'Preço', field: 'preco', style: 'col-preco' },
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
          this.processandoOperacao = false;
        },
        (error: HttpErrorResponse) => {
          this.toasty.error(this.mensagemDoErro(error));
          this.processandoOperacao = false;
        }
      )
  }

  private mensagemDoErro(erro: HttpErrorResponse): string {
    return JSON.parse(erro.error).message;
  }
}
