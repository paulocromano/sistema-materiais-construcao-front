import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyComponent } from './../shared/toasty/toasty.component';
import { CompraService } from './shared/service/compra.service';
import { CompraDTO } from './shared/model/compra.dto';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})

export class CompraComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public pesquisa: string;
  public processandoOperacao: boolean = false;

  public compras: CompraDTO[];

  public tabView = [
    { header: 'ID', field: 'id', style: 'col-id' },
    { header: 'Produto', field: 'produto', style: 'col-produto' },
    { header: 'Quantidade', field: 'quantidade', style: 'col-quantidade' },
    { header: 'Preço R$', field: 'preco', style: 'col-preco' },
    { header: 'Total R$', field: 'total', style: 'col-total' }
  ];

  constructor(private compraService: CompraService) { }

  ngOnInit(): void {
    this.listarCompras();
  }


  public listarCompras(): void {
    this.processandoOperacao = true;

    this.compraService.listarTodasCompras()
      .subscribe(
        (compra: CompraDTO[]) => {
          this.compras = compra;
        },
        (error: HttpErrorResponse) => {
          this.toasty.error(error);
        },
        () => this.processandoOperacao = false
      );
  }
}
