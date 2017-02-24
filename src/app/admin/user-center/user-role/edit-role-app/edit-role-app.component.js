import { Component, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
import { Role } from "../role";
export var EditRoleAppComponent = (function () {
    function EditRoleAppComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.role = new Role();
        this.otherApps = [];
        this.page = 1;
        this.pageSize = 10;
        this.params = new URLSearchParams();
        this.completed = new EventEmitter();
    }
    EditRoleAppComponent.prototype.ngOnInit = function () {
        this.params.set('page', this.page.toString());
        this.params.set('page_size', this.pageSize.toString());
    };
    EditRoleAppComponent.prototype.show = function (role) {
        this.role = role;
        $('#edit_role_app_modal').modal('show');
        this.refreshRoleApps();
    };
    EditRoleAppComponent.prototype.hide = function () {
        $('#edit_role_app_modal').modal('hide');
    };
    EditRoleAppComponent.prototype.refreshRoleApps = function () {
        var _this = this;
        var url = this.gs.getAppByRoleIDURL + this.role.id.toString();
        var sc = this.http.get(url, { withCredentials: true }).subscribe(function (req) {
            if (req.status == 200) {
                var data = req.json();
                _this.role.apps = data.data;
                _this.getOtherApps();
                sc.unsubscribe();
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    EditRoleAppComponent.prototype.addApp = function (appid) {
        var _this = this;
        var url = this.gs.addAppToRoleURL + this.role.id.toString() + '/' + appid.toString();
        var sc = this.http.post(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.completed.emit();
            _this.gs.showingTopFlashMessageSuccess();
            _this.refreshRoleApps();
        }, function (err) {
            console.log(err);
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
    };
    EditRoleAppComponent.prototype.deleteApp = function (appid) {
        var _this = this;
        var url = this.gs.deleteAppFromRoleURL + this.role.id.toString() + '/' + appid.toString();
        var sc = this.http.delete(url, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.completed.emit();
            _this.gs.showingTopFlashMessageSuccess();
            _this.refreshRoleApps();
        }, function (err) {
            console.log(err);
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
    };
    EditRoleAppComponent.prototype.getOtherApps = function () {
        var _this = this;
        var ids = [];
        for (var _i = 0, _a = this.role.apps; _i < _a.length; _i++) {
            var app = _a[_i];
            ids.push(app['id']);
        }
        var url = this.gs.getRoleOtherAppsURL + '?filter=id:notin:' + ids.join(',');
        var sc = this.http.get(url, { withCredentials: true }).subscribe(function (req) {
            if (req.status == 200) {
                var data = req.json();
                _this.otherApps = data.data;
                sc.unsubscribe();
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    EditRoleAppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-edit-role-app',
                    templateUrl: './edit-role-app.component.html',
                    styleUrls: ['./edit-role-app.component.css']
                },] },
    ];
    /** @nocollapse */
    EditRoleAppComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    EditRoleAppComponent.propDecorators = {
        'completed': [{ type: Output },],
    };
    return EditRoleAppComponent;
}());
//# sourceMappingURL=edit-role-app.component.js.map