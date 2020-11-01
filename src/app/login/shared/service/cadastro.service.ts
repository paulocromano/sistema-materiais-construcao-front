import { API_CONFIG } from './../../../config/api.condig';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CadastroFORM } from '../model/cadastro.form';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {

  constructor(private http: HttpClient) { }

  public cadastrarUsuario(dadosNovoUsuario: CadastroFORM): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/cliente`, dadosNovoUsuario);
  }
}
