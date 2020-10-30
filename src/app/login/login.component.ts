import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { CredenciaisDTO } from './shared/model/credenciaisDTO';
import { AuthService } from './../shared/service/auth.service';
import { ToastyComponent } from './../shared/toasty/toasty.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public credenciais = new CredenciaisDTO();
  public erroValidacaoLogin: string;

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void { 
  }

  public login(): void {    
    this.authService.authenticate(this.credenciais)
      .subscribe((response: any) => {
        this.authService.successfullLogin(response.headers.get('Authorization'));
      },
      (error: HttpErrorResponse) => {
        this.toasty.error(this.mensagemDoErro(error));
      });

      this.credenciais = new CredenciaisDTO();
  }

  private mensagemDoErro(erro: any): string {
    return JSON.parse(erro.error).message;
  }
}
