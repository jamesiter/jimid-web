import { Component, EventEmitter, Output } from '@angular/core';
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
import { Role } from "../role";
export var DeleteRoleComponent = (function () {
    function DeleteRoleComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.role = new Role();
        this.completed = new EventEmitter();
    }
    DeleteRoleComponent.prototype.ngOnInit = function () {
    };
    DeleteRoleComponent.prototype.show = function (role) {
        this.role = role;
        $('#delete_role_modal').modal('show');
    };
    DeleteRoleComponent.prototype.hide = function () {
        $('#delete_role_modal').modal('hide');
    };
    DeleteRoleComponent.prototype.onSubmit = function () {
        var _this = this;
        var url = this.gs.deleteRoleURL + this.role.id.toString();
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
    DeleteRoleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-delete-role',
                    templateUrl: './delete-role.component.html',
                    styleUrls: ['./delete-role.component.css']
                },] },
    ];
    /** @nocollapse */
    DeleteRoleComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    DeleteRoleComponent.propDecorators = {
        'completed': [{ type: Output },],
    };
    return DeleteRoleComponent;
}());
//# sourceMappingURL=delete-role.component.js.map