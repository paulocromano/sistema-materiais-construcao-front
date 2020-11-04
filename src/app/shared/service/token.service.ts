import { PermissaoCliente } from './../model/permissao-cliente';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtHelper = new JwtHelperService();
  private token: string;
  private tokenDecodificado: any;

  constructor(private storage: StorageService) { 
    this.atualizaToken();
  }

  private atualizaToken(): void {
    if (this.storage.getLocalUser()) {
      this.token = this.storage.getLocalUser().token;
      this.tokenDecodificado = this.jwtHelper.decodeToken(this.token);
    }
    else {
      this.token = null;
    }
  }

  public temPermissaoDeADMIN(): boolean {
    this.atualizaToken();
    
    let permissao: string = this.tokenDecodificado.permissoes.split(', ')[0];
    let isADMIN: boolean = (permissao === PermissaoCliente.ADMIN || permissao.concat(']') === PermissaoCliente.ADMIN) ? true : false;
    
    return (this.token && isADMIN);
  }

  public getIDCliente(): number {
    return this.token && this.tokenDecodificado.id;
  }
}
