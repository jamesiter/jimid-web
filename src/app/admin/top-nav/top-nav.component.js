import { Component, Input } from '@angular/core';
import { AuthService } from "../../core/auth.service";
import { GlobalService } from "../../core/global.service";
export var TopNavComponent = (function () {
    /*
    private topNavTipObservable: Observable<string>;
    private sc;
    */
    function TopNavComponent(authService, gs) {
        this.authService = authService;
        this.gs = gs;
        this.login_name = '';
        /* this.topNavTipObservable = Observable.create((observer:Observer<string>) => {
          this.gs.topNavTipObserver = observer;
        });
        this.sc = this.topNavTipObservable.subscribe(
          (next) => {
    
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.sc.unsubscribe();
          }
        )*/
    }
    TopNavComponent.prototype.ngOnInit = function () {
    };
    TopNavComponent.prototype.logout = function () {
        this.authService.logout();
    };
    TopNavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-top-nav',
                    templateUrl: './top-nav.component.html',
                    styleUrls: ['./top-nav.component.css'],
                },] },
    ];
    /** @nocollapse */
    TopNavComponent.ctorParameters = [
        { type: AuthService, },
        { type: GlobalService, },
    ];
    TopNavComponent.propDecorators = {
        'login_name': [{ type: Input },],
    };
    return TopNavComponent;
}());
//# sourceMappingURL=top-nav.component.js.map