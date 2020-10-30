import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CredenciaisDTO } from '../../login/shared/model/credenciaisDTO';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    authenticate(credenciais: CredenciaisDTO) {
        return this.http.post(`http://localhost:8080/login`, credenciais,
            {
                observe: 'response',
                responseType: 'text'
            }    
        );
    }
}