import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { CredenciaisDTO } from './shared/model/credenciaisDTO';
import { AuthService } from './../shared/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credenciais = new CredenciaisDTO();

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void { }

  public login(): void {    
    this.authService.authenticate(this.credenciais)
      .subscribe(response => {
        this.authService.successfullLogin(response.headers.get('Authorization'));
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      });

      this.credenciais = new CredenciaisDTO();
  }
}
