import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../core/auth-guard.service";
import { UserComponent } from "./user.component";
import { AppNavComponent } from "./app-nav/app-nav.component";
/**
 * Created by James on 2016/12/14.
 */
var userRoutes = [
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
export var UserRoutingModule = (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        RouterModule.forChild(userRoutes)
                    ],
                    exports: [
                        RouterModule
                    ]
                },] },
    ];
    /** @nocollapse */
    UserRoutingModule.ctorParameters = [];
    return UserRoutingModule;
}());
//# sourceMappingURL=user-routing.module.js.map