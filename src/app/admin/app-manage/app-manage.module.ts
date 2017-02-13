import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AppManageComponent} from "./app-manage.component";
import {AppListComponent} from "./app-list/app-list.component";
import {CreateAppComponent} from "./app-list/create-app/create-app.component";
import {DeleteAppComponent} from "./app-list/delete-app/delete-app.component";
import {OpenidComponent} from "./openid/openid.component";
import {EditOpenidComponent} from "./openid/edit-openid/edit-openid.component";
import {DeleteOpenidComponent} from "./openid/delete-openid/delete-openid.component";
import {EditAppComponent} from "./app-list/edit-app/edit-app.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AppManageComponent,
    AppListComponent, CreateAppComponent, DeleteAppComponent, EditAppComponent,
    OpenidComponent, EditOpenidComponent, DeleteOpenidComponent
  ]
})

export class AppManageModule { }
