import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "../core/auth-guard.service";
import { userCenterRoutes } from "./user-center/user-center-routing.module";
import { appManageRoutes } from "./app-manage/app-manage-routing.module";
/**
 * Created by James on 2016/12/14.
 */
var adminRoutes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'user', children: userCenterRoutes, canActivate: [AuthGuard] },
            { path: 'app-manage', children: appManageRoutes, canActivate: [AuthGuard] },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    }
];
export var AdminRoutingModule = (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        RouterModule.forChild(adminRoutes)
                    ],
                    exports: [
                        RouterModule
                    ]
                },] },
    ];
    /** @nocollapse */
    AdminRoutingModule.ctorParameters = [];
    return AdminRoutingModule;
}());
//# sourceMappingURL=admin-routing.module.js.map