import { Component, EventEmitter, Output } from '@angular/core';
import { User } from "../user";
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
export var DeleteUserComponent = (function () {
    function DeleteUserComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.user = new User();
        this.completed = new EventEmitter();
    }
    DeleteUserComponent.prototype.ngOnInit = function () {
    };
    DeleteUserComponent.prototype.show = function (user) {
        this.user = user;
        $('#delete_user_modal').modal('show');
    };
    DeleteUserComponent.prototype.hide = function () {
        $('#delete_user_modal').modal('hide');
    };
    DeleteUserComponent.prototype.onSubmit = function () {
        var _this = this;
        var url = this.gs.deleteUserURL + this.user.id.toString();
        var sc = this.http.delete(url, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.completed.emit();
            _this.gs.showingTopFlashMessageSuccess();
        }, function (err) {
            console.log(err);
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
        this.hide();
    };
    DeleteUserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-delete-user',
                    templateUrl: './delete-user.component.html',
                    styleUrls: ['./delete-user.component.css']
                },] },
    ];
    /** @nocollapse */
    DeleteUserComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    DeleteUserComponent.propDecorators = {
        'completed': [{ type: Output },],
    };
    return DeleteUserComponent;
}());
//# sourceMappingURL=delete-user.component.js.map