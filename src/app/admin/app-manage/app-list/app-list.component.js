import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { GlobalService } from "../../../core/global.service";
export var AppListComponent = (function () {
    function AppListComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.apps = [];
    }
    AppListComponent.prototype.ngOnInit = function () {
    };
    AppListComponent.prototype.ngAfterViewInit = function () {
        this.getApps();
    };
    AppListComponent.prototype.getApps = function () {
        var _this = this;
        var sc = this.http.get(this.gs.searchAppsURL + '?order_by=create_time', { withCredentials: true }).subscribe(function (req) {
            if (req.status == 200) {
                var data = req.json();
                _this.apps = data.data;
                sc.unsubscribe();
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    AppListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-app-list',
                    templateUrl: './app-list.component.html',
                    styleUrls: ['./app-list.component.css']
                },] },
    ];
    /** @nocollapse */
    AppListComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    return AppListComponent;
}());
//# sourceMappingURL=app-list.component.js.map