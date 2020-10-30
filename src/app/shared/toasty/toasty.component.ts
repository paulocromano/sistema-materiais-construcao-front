import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toasty',
  templateUrl: './toasty.component.html',
  styleUrls: ['./toasty.component.css'],
  providers: [ MessageService ]
})

export class ToastyComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public error(mensagem: string): void {
    this.mensagemErro('error', 'Erro', mensagem);
  }

  public success(mensagem: string): void {
    this.mensagemErro('success', 'Sucesso', mensagem);
  }

  public info(mensagem: string): void {
    this.mensagemErro('info', 'Informação', mensagem);
  }

  public warning(mensagem: string): void {
    this.mensagemErro('warn', 'Atenção', mensagem);
  }

  public mensagemErro(tipoErro: string, tituloErro: string, mensagem: string): void {
    this.messageService.add({
      severity: tipoErro, 
      summary: tituloErro, 
      detail: mensagem
    });
  }
}
