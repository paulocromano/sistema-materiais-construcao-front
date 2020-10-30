import { Component, OnInit } from '@angular/core';

import { CredenciaisDTO } from './shared/model/credenciaisDTO';
import { AuthService } from './../shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credenciais = new CredenciaisDTO();

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  public login() {
    console.log(this.credenciais);
    
    this.authService.authenticate(this.credenciais)
      .subscribe(response => {
        console.log(response.headers.get('Authorization'));
      },
      error => {
        console.log(error)
      });
  }
}
