import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtModule } from "@auth0/angular-jwt";

import { LoginModule } from './login/login.module';
import { AuthService } from './shared/service/auth.service';
import { StorageService } from './shared/service/storage.service';
import { ErrorInterceptorProvider } from './interceptor/error-interceptor';
import { ProdutoModule } from './produto/produto.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClienteModule } from './cliente/cliente.module';
import { TokenService } from './shared/service/token.service';
import { CompraModule } from './compra/compra.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    ProdutoModule,
    DashboardModule,
    ClienteModule,
    CompraModule,
    JwtModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TokenService,
    StorageService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
