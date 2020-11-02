import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../shared/service/auth.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void { }

  public acessarSite(): void {
    console.log(this.authService.usuarioEstaLogado())
    if (this.authService.usuarioEstaLogado()) {
      this.router.navigate(['/produto']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
