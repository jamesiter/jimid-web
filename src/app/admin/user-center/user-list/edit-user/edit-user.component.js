import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from "../user";
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
export var EditUserComponent = (function () {
    function EditUserComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.user = new User();
        this.completed = new EventEmitter();
        this.formErrors = {
            'login_name': '',
            'password': '',
            'mobile_phone': '',
            'email': ''
        };
        this.validationMessages = {
            'login_name': {
                'required': '用户名为必填字段。',
                'minlength': '用户名不得少于5个字符。',
                'maxlength': '用户名不得超30个字符。'
            },
            'password': {
                'required': '密码为必填字段。',
                'minlength': '密码长度不得少于6个字符。',
                'maxlength': '密码长度不得超100个字符。'
            },
            'mobile_phone': {
                'pattern': '请输入有效的手机号码。'
            },
            'email': {
                'pattern': '请输入有效的E-Mail地址。'
            }
        };
    }
    EditUserComponent.prototype.ngOnInit = function () {
    };
    EditUserComponent.prototype.show = function (user) {
        this.user = user;
        $('#edit_user_modal').modal('show');
    };
    EditUserComponent.prototype.hide = function () {
        $('#edit_user_modal').modal('hide');
    };
    EditUserComponent.prototype.ngAfterViewChecked = function () {
        this.FormChanged();
    };
    EditUserComponent.prototype.FormChanged = function () {
        var _this = this;
        if (this.currentForm === this.updateUserForm) {
            return;
        }
        this.updateUserForm = this.currentForm;
        if (this.updateUserForm) {
            this.updateUserForm.valueChanges.subscribe(function (data) {
                if (!_this.updateUserForm) {
                    return;
                }
                var form = _this.updateUserForm.form;
                _this.onValueChanged(form, data);
            });
        }
    };
    EditUserComponent.prototype.onValueChanged = function (form, data) {
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
    EditUserComponent.prototype.onSubmit = function () {
        var _this = this;
        var payload = {};
        if (this.user.login_name.length > 0) {
            payload['login_name'] = this.user.login_name;
        }
        if (this.user.mobile_phone.length == 11) {
            payload['mobile_phone'] = this.user.mobile_phone;
            payload['mobile_phone_verified'] = true;
        }
        else {
            payload['mobile_phone_verified'] = false;
        }
        if (this.user.email.length > 0) {
            payload['email'] = this.user.email;
            payload['email_verified'] = true;
        }
        else {
            payload['email_verified'] = false;
        }
        var url = this.gs.updateUserURL + this.user.id;
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
    EditUserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-edit-user',
                    templateUrl: './edit-user.component.html',
                    styleUrls: ['./edit-user.component.css']
                },] },
    ];
    /** @nocollapse */
    EditUserComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    EditUserComponent.propDecorators = {
        'currentForm': [{ type: ViewChild, args: ["updateUserForm",] },],
        'completed': [{ type: Output },],
    };
    return EditUserComponent;
}());
//# sourceMappingURL=edit-user.component.js.map