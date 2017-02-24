import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalService } from "../core/global.service";
import { Observable } from "rxjs";
export var AdminComponent = (function () {
    function AdminComponent(gs) {
        var _this = this;
        this.gs = gs;
        this.Observable = Observable.create(function (observer) {
            _this.gs.roleObserver = observer;
        });
        this.sc = this.Observable.subscribe(function (next) {
            if (next != 1) {
                _this.gs.navigate('/user');
            }
            _this.sc.unsubscribe();
        }, function (err) {
            console.log(err);
        }, function () {
            _this.sc.unsubscribe();
        });
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.gs.getSelfInfo();
    };
    /*
    'vendors/bootstrap/dist/css/bootstrap.min.css',
    'vendors/font-awesome/css/font-awesome.min.css',
    'vendors/nprogress/nprogress.css',
    'vendors/iCheck/skins/flat/green.css',
    'vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css',
    'vendors/jqvmap/dist/jqvmap.min.css',
    'vendors/bootstrap-daterangepicker/daterangepicker.css',
    'assets/src/scss/custom.css',
    */
    AdminComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-admin',
                    templateUrl: './admin.component.html',
                    styleUrls: [
                        '../../assets/src/scss/custom.css',
                        './admin.component.css',
                    ],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    AdminComponent.ctorParameters = [
        { type: GlobalService, },
    ];
    return AdminComponent;
}());
//# sourceMappingURL=admin.component.js.map