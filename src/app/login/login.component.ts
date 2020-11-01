import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { CredenciaisDTO } from './shared/model/credenciais.dto';
import { AuthService } from './../shared/service/auth.service';
import { ToastyComponent } from './../shared/toasty/toasty.component';
import { CadastroService } from './shared/service/cadastro.service';
import { CadastroFORM } from './shared/model/cadastro.form';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;

  public credenciais = new CredenciaisDTO();
  public cadastro = new CadastroFORM();
  public processandoOperacao: boolean = false;

  constructor(
    private authService: AuthService,
    private cadastroService: CadastroService,
    private router: Router
    ) { }

  ngOnInit(): void { }

  public login(): void {    
    this.processandoOperacao = true;

    this.authService.authenticate(this.credenciais)
      .subscribe((response: any) => {
        this.authService.successfullLogin(response.headers.get('Authorization'));

        this.toasty.success('Login efetuado com Sucesso!');
        this.router.navigate(['/produto'])
        this.processandoOperacao = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        //this.toasty.error(this.mensagemDoErro(error));
        this.processandoOperacao = false;
      });

      this.credenciais = new CredenciaisDTO();
  }

  public cadastroUsuario(): void {
    if (this.validacoesCamposCadastro()) {
      this.toasty.error('Favor preencher todos os campos antes de efetuar o Cadastro!');
    }
    else {
      this.processandoOperacao = true;

      this.cadastroService.cadastrarUsuario(this.cadastro)
        .subscribe(
          (success: any) => {
            this.toasty.success(`usuario cadastrado com sucesso!`);
            this.processandoOperacao = false;
          },
          (error: HttpErrorResponse) => {
            if (error.status === 422) {
              this.errosValidacoesCamposCadastro(error);
            }
            else {
              this.toasty.error('Houve um erro ao efetuar o Cadastro!')
            }

            this.processandoOperacao = false;
        });

      this.cadastro = new CadastroFORM();
    }
  }

  private validacoesCamposCadastro(): boolean {
    return !(this.cadastro.nome && this.cadastro.dataNascimento && this.cadastro.email && this.cadastro.senha);
  }

  private errosValidacoesCamposCadastro(erro: HttpErrorResponse): void {
    let errosValidacoes = erro.error.errors;
    errosValidacoes.forEach(erroValidacao => this.toasty.error(erroValidacao.message));
  }

  private mensagemDoErro(erro: HttpErrorResponse): string {
    return JSON.parse(erro.error).message;
  }
}
