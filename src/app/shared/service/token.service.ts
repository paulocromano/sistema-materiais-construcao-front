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
    if (this.storage.getLocalUser()) {
      this.token = this.storage.getLocalUser().token;
      this.tokenDecodificado = this.jwtHelper.decodeToken(this.token);
    }
    else {
      this.token = null;
    }
  }

  public temPermissao(permissao: string): boolean {
    return this.token && this.tokenDecodificado.permissoes.includes(permissao);
  }

  public getIDCliente(): number {
    return this.token && this.tokenDecodificado.id;
  }
}
