/**
 * Created by James on 2016/12/16.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
export var AuthGuard = (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.ngOnDestroy = function () {
    };
    AuthGuard.prototype.canActivate = function (activatedRouteSnapshot, state) {
        var url = state.url;
        var queryParams = {};
        for (var key in activatedRouteSnapshot.queryParams) {
            queryParams[key] = activatedRouteSnapshot.queryParams[key];
        }
        return this.checkLogin(url, queryParams);
    };
    AuthGuard.prototype.checkLogin = function (url, queryParams) {
        if (this.authService.isLoggedIn) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url.split('?')[0];
        this.authService.redirectQueryParams = queryParams;
        // Navigate to the login page with extras
        // this.router.navigate(['/', {outlets: {'all-page': ['login']}}]);
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AuthGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = [
        { type: Router, },
        { type: AuthService, },
    ];
    return AuthGuard;
}());
//# sourceMappingURL=auth-guard.service.js.map