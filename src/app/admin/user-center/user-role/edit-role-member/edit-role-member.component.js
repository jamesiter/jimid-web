import { Component, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
import { Role } from "../role";
import { Subject } from "rxjs";
export var EditRoleMemberComponent = (function () {
    function EditRoleMemberComponent(http, gs) {
        var _this = this;
        this.http = http;
        this.gs = gs;
        this.role = new Role();
        this.freeUsers = [];
        this.page = 1;
        this.pageSize = 10;
        this.keyword = '';
        this.searchContentStream = new Subject();
        this.params = new URLSearchParams();
        this.completed = new EventEmitter();
        this.subscriptionBySearch = this.searchContentStream
            .debounceTime(300)
            .do(function (keyword) {
            _this.keyword = keyword;
        }).subscribe(function (next) {
            _this.params.set('keyword', _this.keyword.toString());
            var sc = _this.http.get(_this.gs.searchRoleFreeUsersURL, { withCredentials: true, search: _this.params }).subscribe(function (req) {
                if (req.status == 200) {
                    var data = req.json();
                    _this.freeUsers = data.data;
                    _this.refreshRoleUsers();
                    sc.unsubscribe();
                }
            }, function (err) {
                console.log(err);
            }, function () {
            });
        }, function (err) {
            console.log(err);
        }, function () {
        });
    }
    EditRoleMemberComponent.prototype.ngOnInit = function () {
        this.params.set('page', this.page.toString());
        this.params.set('page_size', this.pageSize.toString());
        this.getFreeUsers();
    };
    EditRoleMemberComponent.prototype.show = function (role) {
        this.role = role;
        $('#edit_role_member_modal').modal('show');
    };
    EditRoleMemberComponent.prototype.hide = function () {
        $('#edit_role_member_modal').modal('hide');
    };
    EditRoleMemberComponent.prototype.refreshRoleUsers = function () {
        var _this = this;
        var url = this.gs.getUsersURL + '?filter=role_id:in:' + this.role.id.toString();
        var sc = this.http.get(url, { withCredentials: true }).subscribe(function (req) {
            if (req.status == 200) {
                var data = req.json();
                _this.role.users = data.data;
                sc.unsubscribe();
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    EditRoleMemberComponent.prototype.addMember = function (uid) {
        var _this = this;
        var url = this.gs.addMemberToRoleURL + this.role.id.toString() + '/' + uid.toString();
        var sc = this.http.post(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.completed.emit();
            _this.gs.showingTopFlashMessageSuccess();
            _this.getFreeUsers();
        }, function (err) {
            console.log(err);
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
    };
    EditRoleMemberComponent.prototype.deleteMember = function (uid) {
        var _this = this;
        var url = this.gs.deleteMemberFromRoleURL + this.role.id.toString() + '/' + uid.toString();
        var sc = this.http.delete(url, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.completed.emit();
            _this.gs.showingTopFlashMessageSuccess();
            _this.getFreeUsers();
        }, function (err) {
            console.log(err);
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
    };
    EditRoleMemberComponent.prototype.searchContent = function (keyword) {
        this.searchContentStream.next(keyword);
    };
    EditRoleMemberComponent.prototype.getFreeUsers = function () {
        this.searchContentStream.next('');
    };
    EditRoleMemberComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-edit-role-member',
                    templateUrl: './edit-role-member.component.html',
                    styleUrls: ['./edit-role-member.component.css']
                },] },
    ];
    /** @nocollapse */
    EditRoleMemberComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    EditRoleMemberComponent.propDecorators = {
        'completed': [{ type: Output },],
    };
    return EditRoleMemberComponent;
}());
//# sourceMappingURL=edit-role-member.component.js.map