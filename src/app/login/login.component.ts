import { ClienteService } from './../cliente/shared/service/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { CredenciaisDTO } from './shared/model/credenciais.dto';
import { AuthService } from './../shared/service/auth.service';
import { ToastyComponent } from './../shared/toasty/toasty.component';
import { ClienteFORM } from '../cliente/shared/model/cliente.form';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public credenciais = new CredenciaisDTO();
  public cadastro = new ClienteFORM();
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
        this.router.navigate(['/produto']);
      },
      (error: HttpErrorResponse) => {
        this.processandoOperacao = false;
        this.toasty.error(JSON.parse(error.error).message);
      });

      this.credenciais = new CredenciaisDTO();
  }

  /*public validacoesCamposLogin(): boolean {
    return !(this.credenciais.email && this.credenciais.senha);
  }*/

  public cadastroUsuario(): void {
    this.processandoOperacao = true;

    this.clienteService.cadastrarUsuario(this.cadastro)
      .subscribe(
        (success: any) => {
          this.toasty.success(`Usuario cadastrado com sucesso!`);
          this.processandoOperacao = false;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.toasty.mostrarErrosDeValidacoes(error);
          }
          else {
            this.toasty.error('Houve um erro ao efetuar o Cadastro!')
          }

          this.processandoOperacao = false;
      });

    this.cadastro = new ClienteFORM();
  }

  public validacoesCamposCadastro(): boolean {
    return !(this.cadastro.nome && this.cadastro.dataNascimento && this.cadastro.email && this.cadastro.senha);
  }
}
