/**
 * Created by James on 2016/12/16.
 */
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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/operator/do');
require('rxjs/add/operator/delay');
// Statics
require('rxjs/add/observable/throw');
// Operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/toPromise');
var http_1 = require("@angular/http");
var global_service_1 = require("./global.service");
var AuthService = (function () {
    function AuthService(http, gs) {
        this.http = http;
        this.gs = gs;
        this.signInUrl = this.gs.APIBaseURL + '/user/_sign_in';
        this.signInByMobilePhoneUrl = this.gs.APIBaseURL + '/user/_sign_in_by_mobile_phone';
        this.signInByEMailUrl = this.gs.APIBaseURL + '/user/_sign_in_by_email';
        this.signOutUrl = this.gs.APIBaseURL + '/user/_sign_out';
        this.Url = '';
        this.isLoggedIn = false;
    }
    AuthService.prototype.login = function (channel, password, login_name, mobile_phone, email) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.payload = { login_name: login_name, password: password, mobile_phone: mobile_phone, email: email };
        if (channel == 'email') {
            this.Url = this.signInByEMailUrl;
        }
        else if (channel == 'mobile_phone') {
            this.Url = this.signInByMobilePhoneUrl;
        }
        else {
            this.Url = this.signInUrl;
        }
        console.log(this.Url);
        return this.http.post(this.Url, this.payload, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.Url = this.signOutUrl;
        this.http.get(this.Url).map(function () { _this.extractData; _this.isLoggedIn = false; }).catch(this.handleError);
    };
    AuthService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    AuthService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, global_service_1.GlobalService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map