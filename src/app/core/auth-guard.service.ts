/**
 * Created by James on 2016/12/16.
 */

import {Injectable, OnDestroy}       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnDestroy() {
  }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    let queryParams = {};

    for (let key in activatedRouteSnapshot.queryParams) {
      queryParams[key] = activatedRouteSnapshot.queryParams[key];
    }

    return this.checkLogin(url, queryParams);
  }

  checkLogin(url: string, queryParams: any): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url.split('?')[0];
    this.authService.redirectQueryParams = queryParams;

    // Navigate to the login page with extras
    // this.router.navigate(['/', {outlets: {'all-page': ['login']}}]);
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
