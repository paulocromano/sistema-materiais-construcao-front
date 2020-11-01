import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProdutoFORM } from './../model/produto.form';
import { API_CONFIG } from './../../../config/api.condig';
import { ProdutoDTO } from '../model/produto.dto';
import { AtualizarProdutoFORM } from './../model/atualizar-produto.form';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  constructor(private http: HttpClient) { }


  public listarTodosProdutos(): Observable<ProdutoDTO[]> {
    return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produto/listar-todos`);
  }

  public cadastrarProduto(produto: ProdutoFORM): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/produto`, produto);
  }

  public atualizarProduto(id: number, produto: AtualizarProdutoFORM): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/produto/${id}`, produto);
  }

  public removerProduto(id: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/produto/${id}`);
  }
}
