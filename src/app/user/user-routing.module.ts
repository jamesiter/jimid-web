import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../core/auth-guard.service";
import {UserComponent} from "./user.component";
import {AppNavComponent} from "./app-nav/app-nav.component";
/**
 * Created by James on 2016/12/14.
 */

const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'app-nav', component: AppNavComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'app-nav', pathMatch: 'full', canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule {}
