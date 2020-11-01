import { Component, OnInit } from '@angular/core';

import { AuthService } from './../shared/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public usuarioEstaLogado: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioEstaLogado = this.authService.usuarioEstaLogado();
  }
}
