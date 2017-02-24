import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { FooterComponent } from "./footer/footer.component";
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component";
import { FooterMenuComponent } from "./footer-menu/footer-menu.component";
import { TopNavComponent } from "./top-nav/top-nav.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserCenterModule } from "./user-center/user-center.module";
import { AppManageModule } from "./app-manage/app-manage.module";
export var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        UserCenterModule,
                        AppManageModule,
                        AdminRoutingModule
                    ],
                    declarations: [
                        FooterComponent,
                        SidebarMenuComponent,
                        FooterMenuComponent,
                        TopNavComponent,
                        DashboardComponent,
                        AdminComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    AdminModule.ctorParameters = [];
    return AdminModule;
}());
//# sourceMappingURL=admin.module.js.map