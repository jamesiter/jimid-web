import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from "./user-routing.module";
import { UserTopNavComponent } from "./user-top-nav/user-top-nav.component";
import { UserFooterComponent } from "./user-footer/user-footer.component";
import { AppNavComponent } from "./app-nav/app-nav.component";
export var UserModule = (function () {
    function UserModule() {
    }
    UserModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        UserRoutingModule
                    ],
                    declarations: [
                        UserComponent,
                        UserTopNavComponent,
                        UserFooterComponent,
                        AppNavComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    UserModule.ctorParameters = [];
    return UserModule;
}());
//# sourceMappingURL=user.module.js.map