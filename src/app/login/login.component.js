import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";
import { LoginUser } from "./login-user";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { GlobalService } from "../core/global.service";
export var LoginComponent = (function () {
    function LoginComponent(http, gs, router, authService) {
        this.http = http;
        this.gs = gs;
        this.router = router;
        this.authService = authService;
        this.loginUser = new LoginUser();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        this.auth();
    };
    LoginComponent.prototype.auth = function () {
        var _this = this;
        var sc = this.authService.auth().subscribe(function (req) {
            if (req.status == 200) {
                _this.authService.isLoggedIn = true;
                console.log('Auth succeed!');
                _this.router.navigate([_this.authService.redirectUrl], { queryParams: _this.authService.redirectQueryParams });
            }
            else if (req.status == 278) {
                var body = req.json();
                // window.location.href = body['redirect']['location'];
                _this.router.navigate(['/login']);
            }
            sc.unsubscribe();
        }, function (err) {
            console.log('Auth failed!');
            console.log(err);
        }, function () {
            console.log('Auth complete!');
            console.log(_this.authService.isLoggedIn);
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var sc = this.authService.login('login_name', this.loginUser.password, this.loginUser.login_name, this.loginUser.mobile_phone, this.loginUser.email).subscribe(function (req) {
            if (req.status == 200) {
                _this.authService.isLoggedIn = true;
                _this.router.navigate(['/']);
                console.log('Login succeed!');
            }
            else {
                _this.authService.isLoggedIn = false;
                _this.router.navigate(['/login']);
            }
            sc.unsubscribe();
        }, function (err) {
            _this.authService.isLoggedIn = false;
            _this.router.navigate(['/login']);
            console.log('Login failed!');
            console.log(err);
            return Observable.throw(err);
        }, function () {
            console.log('Login complete!');
        });
    };
    LoginComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-login',
                    templateUrl: './login.component.html',
                    styleUrls: [
                        '../../vendors/bootstrap/dist/css/bootstrap.min.css',
                        '../../vendors/font-awesome/css/font-awesome.min.css',
                        '../../vendors/nprogress/nprogress.css',
                        '../../vendors/animate.css/animate.min.css',
                        '../../assets/src/scss/custom.css',
                        './login.component.css',
                    ],
                    encapsulation: ViewEncapsulation.Native
                },] },
    ];
    /** @nocollapse */
    LoginComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
        { type: Router, },
        { type: AuthService, },
    ];
    return LoginComponent;
}());
//# sourceMappingURL=login.component.js.map