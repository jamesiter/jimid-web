import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalService } from "../core/global.service";
import { Observable } from "rxjs";
export var UserComponent = (function () {
    function UserComponent(gs) {
        var _this = this;
        this.gs = gs;
        this.Observable = Observable.create(function (observer) {
            _this.gs.roleObserver = observer;
        });
        this.sc = this.Observable.subscribe(function (next) {
            if (next == 1) {
                _this.gs.navigate('/admin');
            }
            _this.sc.unsubscribe();
        }, function (err) {
            console.log(err);
        }, function () {
            _this.sc.unsubscribe();
        });
    }
    UserComponent.prototype.ngOnInit = function () {
        this.gs.getSelfInfo();
    };
    UserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user',
                    templateUrl: './user.component.html',
                    styleUrls: [
                        '../../assets/src/scss/custom.css',
                        './user.component.css',
                    ],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    UserComponent.ctorParameters = [
        { type: GlobalService, },
    ];
    return UserComponent;
}());
//# sourceMappingURL=user.component.js.map