import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserTopNavComponent} from "./user-top-nav/user-top-nav.component";
import {UserFooterComponent} from "./user-footer/user-footer.component";
import {AppNavComponent} from "./app-nav/app-nav.component";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserTopNavComponent,
    UserFooterComponent,
    AppNavComponent
  ]
})
export class UserModule { }
