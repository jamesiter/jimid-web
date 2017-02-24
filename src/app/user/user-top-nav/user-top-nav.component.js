import { Component, Input } from '@angular/core';
import { AuthService } from "../../core/auth.service";
import { GlobalService } from "../../core/global.service";
export var UserTopNavComponent = (function () {
    function UserTopNavComponent(authService, gs) {
        this.authService = authService;
        this.gs = gs;
        this.login_name = '';
    }
    UserTopNavComponent.prototype.ngOnInit = function () {
    };
    UserTopNavComponent.prototype.logout = function () {
        this.authService.logout();
    };
    UserTopNavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-top-nav',
                    templateUrl: './user-top-nav.component.html',
                    styleUrls: ['./user-top-nav.component.css']
                },] },
    ];
    /** @nocollapse */
    UserTopNavComponent.ctorParameters = [
        { type: AuthService, },
        { type: GlobalService, },
    ];
    UserTopNavComponent.propDecorators = {
        'login_name': [{ type: Input },],
    };
    return UserTopNavComponent;
}());
//# sourceMappingURL=user-top-nav.component.js.map