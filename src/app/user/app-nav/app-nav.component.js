import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { GlobalService } from "../../core/global.service";
export var AppNavComponent = (function () {
    function AppNavComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.appList = [];
    }
    AppNavComponent.prototype.ngOnInit = function () {
    };
    AppNavComponent.prototype.ngAfterViewInit = function () {
        this.getAppList();
    };
    AppNavComponent.prototype.getAppList = function () {
        var _this = this;
        var sc = this.http.get(this.gs.getSelfAppListURL + '?order_by=create_time', { withCredentials: true }).subscribe(function (req) {
            if (req.status == 200) {
                var data = req.json();
                _this.appList = data.data;
                sc.unsubscribe();
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    AppNavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-app-nav',
                    templateUrl: './app-nav.component.html',
                    styleUrls: ['./app-nav.component.css']
                },] },
    ];
    /** @nocollapse */
    AppNavComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    return AppNavComponent;
}());
//# sourceMappingURL=app-nav.component.js.map