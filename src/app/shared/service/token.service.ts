import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtHelper = new JwtHelperService();
  private token: string;

  constructor(private storage: StorageService) { 
    this.token = this.storage.getLocalUser().token;
  }

  private decodificarToken(): any {
    return this.jwtHelper.decodeToken(this.token);
  }

  public temPermissao(permissao: string): boolean {
    return this.token && this.decodificarToken().permissoes.includes(permissao);
  }
}
