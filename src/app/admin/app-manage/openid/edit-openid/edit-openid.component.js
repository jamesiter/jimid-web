import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
import { Openid } from "../openid";
import { User } from "../../../user-center/user-list/user";
import { App } from "../../app-list/app";
export var EditOpenidComponent = (function () {
    function EditOpenidComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.openid = new Openid();
        this.completed = new EventEmitter();
        this.formErrors = {
            'openid': ''
        };
        this.validationMessages = {
            'openid': {
                'required': 'OpenID为必填字段。',
                'minlength': 'OpenID不得少于1个字符。',
                'maxlength': 'OpenID不得超40个字符。'
            }
        };
        this.openid.user = new User();
        this.openid.app = new App();
    }
    EditOpenidComponent.prototype.ngOnInit = function () {
    };
    EditOpenidComponent.prototype.show = function (openid) {
        this.openid = openid;
        $('#edit_openid_modal').modal('show');
    };
    EditOpenidComponent.prototype.hide = function () {
        $('#edit_openid_modal').modal('hide');
    };
    EditOpenidComponent.prototype.ngAfterViewChecked = function () {
        this.FormChanged();
    };
    EditOpenidComponent.prototype.FormChanged = function () {
        var _this = this;
        if (this.currentForm === this.updateOpenidForm) {
            return;
        }
        this.updateOpenidForm = this.currentForm;
        if (this.updateOpenidForm) {
            this.updateOpenidForm.valueChanges.subscribe(function (data) {
                if (!_this.updateOpenidForm) {
                    return;
                }
                var form = _this.updateOpenidForm.form;
                _this.onValueChanged(form, data);
            });
        }
    };
    EditOpenidComponent.prototype.onValueChanged = function (form, data) {
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    EditOpenidComponent.prototype.onSubmit = function () {
        var _this = this;
        var openid = this.openid.openid;
        var payload = { openid: openid };
        var url = this.gs.updateOpenidURL + this.openid.appid + '/' + this.openid.uid;
        var sc = this.http.patch(url, payload, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.completed.emit();
            _this.gs.showingTopFlashMessageSuccess();
        }, function (err) {
            console.log(err);
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
        this.currentForm.reset();
        this.hide();
    };
    EditOpenidComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-edit-openid',
                    templateUrl: './edit-openid.component.html',
                    styleUrls: ['./edit-openid.component.css']
                },] },
    ];
    /** @nocollapse */
    EditOpenidComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    EditOpenidComponent.propDecorators = {
        'currentForm': [{ type: ViewChild, args: ["updateOpenidForm",] },],
        'completed': [{ type: Output },],
    };
    return EditOpenidComponent;
}());
//# sourceMappingURL=edit-openid.component.js.map