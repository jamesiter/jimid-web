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
import { AppListComponent } from './admin/app-manage/app-list/app-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [
    GlobalService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
