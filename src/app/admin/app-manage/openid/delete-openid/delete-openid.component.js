import { Component, EventEmitter, Output } from '@angular/core';
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
import { Openid } from "../openid";
import { App } from "../../app-list/app";
import { User } from "../../../user-center/user-list/user";
export var DeleteOpenidComponent = (function () {
    function DeleteOpenidComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.openid = new Openid();
        this.completed = new EventEmitter();
        this.openid.app = new App();
        this.openid.user = new User();
    }
    DeleteOpenidComponent.prototype.ngOnInit = function () {
    };
    DeleteOpenidComponent.prototype.show = function (openid) {
        this.openid = openid;
        $('#delete_openid_modal').modal('show');
    };
    DeleteOpenidComponent.prototype.hide = function () {
        $('#delete_openid_modal').modal('hide');
    };
    DeleteOpenidComponent.prototype.onSubmit = function () {
        var _this = this;
        var url = this.gs.deleteOpenidURL + this.openid.appid.toString() + '/' + this.openid.uid.toString();
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
    DeleteOpenidComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-delete-openid',
                    templateUrl: './delete-openid.component.html',
                    styleUrls: ['./delete-openid.component.css']
                },] },
    ];
    /** @nocollapse */
    DeleteOpenidComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    DeleteOpenidComponent.propDecorators = {
        'completed': [{ type: Output },],
    };
    return DeleteOpenidComponent;
}());
//# sourceMappingURL=delete-openid.component.js.map