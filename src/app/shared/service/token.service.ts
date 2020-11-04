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

    let permissoesToken: string = this.tokenDecodificado.permissoes.toString();
    let permissoes: string[] = permissoesToken.substring(1, permissoesToken.length - 1).split(' ');
    
    return (this.token && permissoes.includes(PermissaoCliente.ADMIN));
  }

  public getIDCliente(): number {
    return this.token && this.tokenDecodificado.id;
  }
}
