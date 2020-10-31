import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { AuthService } from './shared/service/auth.service';
import { StorageService } from './shared/service/storage.service';
import { ErrorInterceptorProvider } from './interceptor/error-interceptor';
import { ProdutoModule } from './produto/produto.module';
import { AuthGuard } from './shared/guards/auth.guard';

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
    ProdutoModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    StorageService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
