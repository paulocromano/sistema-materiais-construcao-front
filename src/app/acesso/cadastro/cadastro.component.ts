import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { ClienteService } from './../../cliente/shared/service/cliente.service';
import { ToastyComponent } from './../../shared/toasty/toasty.component';
import { ClienteFORM } from './../../cliente/shared/model/cliente.form';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @ViewChild('toastyComponent', { static: false })
  public toasty: ToastyComponent;


  public cadastro = new ClienteFORM();
  public processandoOperacao: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public cadastroUsuario(): void {
    this.processandoOperacao = true;

    this.clienteService.cadastrarUsuario(this.cadastro)
      .subscribe(
        (success: any) => {
          this.toasty.success(`Usuario cadastrado com sucesso!`);
          this.processandoOperacao = false;
          this.router.navigate(['/login']);
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
