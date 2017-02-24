import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { GlobalService } from "../../../core/global.service";
export var UserRoleComponent = (function () {
    function UserRoleComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.roles = [];
    }
    UserRoleComponent.prototype.ngOnInit = function () {
    };
    UserRoleComponent.prototype.ngAfterViewInit = function () {
        this.getRoles();
    };
    UserRoleComponent.prototype.getRoles = function () {
        var _this = this;
        var sc = this.http.get(this.gs.getUserRoleAppMappingURL, { withCredentials: true }).subscribe(function (req) {
            if (req.status == 200) {
                var data = req.json();
                _this.roles = data.data;
                sc.unsubscribe();
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    UserRoleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-role',
                    templateUrl: './user-role.component.html',
                    styleUrls: ['./user-role.component.css']
                },] },
    ];
    /** @nocollapse */
    UserRoleComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    return UserRoleComponent;
}());
//# sourceMappingURL=user-role.component.js.map