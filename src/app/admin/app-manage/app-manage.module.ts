import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AppManageComponent} from "./app-manage.component";
import {AppKeyListComponent} from "./app-key-list/app-key-list.component";
import {CreateAppKeyComponent} from "./app-key-list/create-app-key/create-app-key.component";
import {DeleteAppKeyComponent} from "./app-key-list/delete-app-key/delete-app-key.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AppManageComponent,
    AppKeyListComponent, CreateAppKeyComponent, DeleteAppKeyComponent
  ]
})

export class AppManageModule { }
