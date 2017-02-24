import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import {AuthService} from "./core/auth.service";
import {AuthGuard} from "./core/auth-guard.service";
import { LoginComponent } from './login/login.component';
import {AdminModule} from "./admin/admin.module";
import {GlobalService} from "./core/global.service";
import {UserModule} from "./user/user.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: Window, useValue: window},
    GlobalService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
