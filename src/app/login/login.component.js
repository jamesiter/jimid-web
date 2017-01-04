"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var auth_service_1 = require("../core/auth.service");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        if (authService.isLoggedIn) {
            this.router.navigate(['/']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.hello = function () {
        console.log('ddddddd');
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: [
                'vendors/bootstrap/dist/css/bootstrap.min.css',
                'vendors/font-awesome/css/font-awesome.min.css',
                'vendors/nprogress/nprogress.css',
                'vendors/animate.css/animate.min.css',
                'assets/src/scss/custom.css',
                './login.component.css',
            ],
            encapsulation: core_1.ViewEncapsulation.Native
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map