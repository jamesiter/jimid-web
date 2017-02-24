import { Component, Output, EventEmitter } from '@angular/core';
import { App } from "../app";
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
export var DeleteAppComponent = (function () {
    function DeleteAppComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.app = new App();
        this.completed = new EventEmitter();
    }
    DeleteAppComponent.prototype.ngOnInit = function () {
    };
    DeleteAppComponent.prototype.show = function (app) {
        this.app = app;
        $('#delete_app_modal').modal('show');
    };
    DeleteAppComponent.prototype.hide = function () {
        $('#delete_app_modal').modal('hide');
    };
    DeleteAppComponent.prototype.onSubmit = function () {
        var _this = this;
        var url = this.gs.deleteAppURL + this.app.id.toString();
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
    DeleteAppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-delete-app',
                    templateUrl: './delete-app.component.html',
                    styleUrls: ['./delete-app.component.css']
                },] },
    ];
    /** @nocollapse */
    DeleteAppComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    DeleteAppComponent.propDecorators = {
        'completed': [{ type: Output },],
    };
    return DeleteAppComponent;
}());
//# sourceMappingURL=delete-app.component.js.map