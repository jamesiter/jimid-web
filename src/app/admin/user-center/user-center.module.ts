import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCenterComponent } from './user-center.component';
import {UserListComponent} from "./user-list/user-list.component";
import {UserLogComponent} from "./user-log/user-log.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ UserCenterComponent, UserListComponent, UserLogComponent ]
})

export class UserCenterModule { }
