import { Component } from '@angular/core';
import { Router } from "@angular/router";
export var AppComponent = (function () {
    // title = 'JimID';
    // currentURL: any;
    function AppComponent(router) {
        this.router = router;
        this.router.events.subscribe(function (val) {
            console.log(val.url);
            // this.currentURL = val.url;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-root',
                    templateUrl: './app.component.html',
                    styleUrls: ['./app.component.css']
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = [
        { type: Router, },
    ];
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map