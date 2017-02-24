import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from "../user";
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
export var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.user = new User();
        this.completed = new EventEmitter();
        this.formErrors = {
            'password': ''
        };
        this.validationMessages = {
            'password': {
                'required': '密码为必填字段。',
                'minlength': '密码长度不得少于6个字符。',
                'maxlength': '密码长度不得超100个字符。'
            }
        };
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
    };
    ResetPasswordComponent.prototype.show = function (user) {
        this.user = user;
        $('#reset_password_modal').modal('show');
    };
    ResetPasswordComponent.prototype.hide = function () {
        $('#reset_password_modal').modal('hide');
    };
    ResetPasswordComponent.prototype.ngAfterViewChecked = function () {
        this.FormChanged();
    };
    ResetPasswordComponent.prototype.FormChanged = function () {
        var _this = this;
        if (this.currentForm === this.resetPasswordForm) {
            return;
        }
        this.resetPasswordForm = this.currentForm;
        if (this.resetPasswordForm) {
            this.resetPasswordForm.valueChanges.subscribe(function (data) {
                if (!_this.resetPasswordForm) {
                    return;
                }
                var form = _this.resetPasswordForm.form;
                _this.onValueChanged(form, data);
            });
        }
    };
    ResetPasswordComponent.prototype.onValueChanged = function (form, data) {
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
    ResetPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        var password = this.user.password;
        var payload = { password: password };
        var url = this.gs.resetPasswordURL + this.user.id;
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
    ResetPasswordComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-reset-password',
                    templateUrl: './reset-password.component.html',
                    styleUrls: ['./reset-password.component.css']
                },] },
    ];
    /** @nocollapse */
    ResetPasswordComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    ResetPasswordComponent.propDecorators = {
        'currentForm': [{ type: ViewChild, args: ["resetPasswordForm",] },],
        'completed': [{ type: Output },],
    };
    return ResetPasswordComponent;
}());
//# sourceMappingURL=reset-password.component.js.map