import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./core/auth-guard.service";
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
/**
 * Created by James on 2016/12/14.
 */

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'user', pathMatch: 'full' , canActivate: [AuthGuard] },
  // TODO: ** 到 404页面
  { path: '**', redirectTo: 'user', pathMatch: 'full' , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}

