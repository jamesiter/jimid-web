import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../core/auth-guard.service";
import {UserCenterComponent} from "./user-center/user-center.component";
import {userCenterRoutes} from "./user-center/user-center-routing.module";
/**
 * Created by James on 2016/12/14.
 */

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'user', children: userCenterRoutes },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule {}
