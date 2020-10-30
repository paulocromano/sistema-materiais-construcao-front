import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { AuthService } from './shared/service/auth.service';
import { StorageService } from './shared/service/storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
