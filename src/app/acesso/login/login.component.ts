import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { CredenciaisDTO } from './shared/model/credenciais.dto';
import { ClienteService } from './../../cliente/shared/service/cliente.service';
import { AuthService } from './../../shared/service/auth.service';
import { ClienteFORM } from './../../cliente/shared/model/cliente.form';
import { ToastyComponent } from './../../shared/toasty/toasty.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public credenciais = new CredenciaisDTO();
  public processandoOperacao: boolean = false;

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private router: Router
    ) { }

  ngOnInit(): void { }

  public login(): void {    
    this.processandoOperacao = true;

    this.authService.authenticate(this.credenciais)
      .subscribe((response: any) => {
        this.authService.successfullLogin(response.headers.get('Authorization'));
        this.processandoOperacao = false;
        this.router.navigate(['/produto']);
      },
      (error: HttpErrorResponse) => {
        this.processandoOperacao = false;

        if (error.status === 401) {
          this.toasty.error(JSON.parse(error.error).message);
        }
        else {
          this.toasty.error('Não foi possível efetuar o Login! Tente novamente.')
        }
      });

      this.credenciais = new CredenciaisDTO();
  }

  /*public validacoesCamposLogin(): boolean {
    return !(this.credenciais.email && this.credenciais.senha);
  }*/
}
