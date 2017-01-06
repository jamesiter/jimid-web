import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCenterComponent } from './user-center.component';
import {UserListComponent} from "./user-list/user-list.component";
import {UserLogComponent} from "./user-log/user-log.component";
import {FormsModule} from "@angular/forms";
import {CreateUserComponent} from "./user-list/create-user/create-user.component";
import {EditUserComponent} from "./user-list/edit-user/edit-user.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    UserCenterComponent,
    UserListComponent, CreateUserComponent, EditUserComponent,
    UserLogComponent
  ]
})

export class UserCenterModule { }
