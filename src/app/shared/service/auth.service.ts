import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from './../../config/api.condig';
import { LocalUser } from './../model/localUser';
import { StorageService } from './storage.service';
import { CredenciaisDTO } from './../../acesso/login/shared/model/credenciais.dto';

@Injectable()
export class AuthService {

    private usuarioAutenticado: boolean = false;

    constructor(
        private http: HttpClient,
        private storageService: StorageService
        ) { }

    public authenticate(credenciais: CredenciaisDTO): Observable<any> {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais,
            {
                observe: 'response',
                responseType: 'text'
            }    
        );
    }

    public successfullLogin(authorizationValue: string): void {
        let token = authorizationValue.substring(7);

        let user = new LocalUser(token);
        this.usuarioAutenticado = this.storageService.setLocalUser(user);
    }

    public logout(): void {
        this.storageService.setLocalUser(null);
        this.usuarioAutenticado = false;
    }

    public usuarioEstaLogado(): boolean {
        return this.usuarioAutenticado;
    }
}