import { CompraFORM } from './../model/compra.form';
import { API_CONFIG } from './../../../config/api.condig';
import { CompraDTO } from './../model/compra.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }


  public listarTodasCompras(): Observable<CompraDTO[]> {
    return this.http.get<CompraDTO[]>(`${API_CONFIG.baseUrl}/compra/listar-todas`);
  }

  public listarComprasCliente(): Observable<CompraDTO[]>  {
    return this.http.get<CompraDTO[]>(`${API_CONFIG.baseUrl}/compra/cliente-listar`);
  }

  public comprarProduto(idProduto: number, compra: CompraFORM): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/compra/${idProduto}`, compra);
  }
}
