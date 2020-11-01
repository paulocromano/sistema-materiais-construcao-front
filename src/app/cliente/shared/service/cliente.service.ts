import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ClienteDTO } from '../model/cliente.dto';
import { ClienteFORM } from './../model/cliente.form';
import { API_CONFIG } from './../../../config/api.condig';
import { AtualizarClienteFORM } from './../model/atualizar-cliente.form';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private http: HttpClient) { }

  public listarTodosClientes(): Observable<ClienteDTO[]> {
    return this.http.get<ClienteDTO[]>(`${API_CONFIG.baseUrl}/cliente/listar-todos`);
  }

  public cadastrarUsuario(dadosNovoUsuario: ClienteFORM): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/cliente`, dadosNovoUsuario);
  }

  public atualizarCliente(id: number, cliente: AtualizarClienteFORM): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/cliente/${id}`, cliente);
  }

  public adicionarPermissaoParaCliente(id: number): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/cliente/adicionar-permissao=${id}`, null);
  }

  public removerCliente(id: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/cliente/${id}`);
  }
}
