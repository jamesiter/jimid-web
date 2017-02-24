import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { User } from "../user";
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
export var CreateUserComponent = (function () {
    function CreateUserComponent(http, gs) {
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
    CreateUserComponent.prototype.ngOnInit = function () {
    };
    CreateUserComponent.prototype.ngAfterViewChecked = function () {
        this.FormChanged();
    };
    CreateUserComponent.prototype.show = function () {
        $('#create_user_modal').modal('show');
    };
    CreateUserComponent.prototype.hide = function () {
        $('#create_user_modal').modal('hide');
    };
    CreateUserComponent.prototype.FormChanged = function () {
        var _this = this;
        if (this.currentForm === this.signUpForm) {
            return;
        }
        this.signUpForm = this.currentForm;
        if (this.signUpForm) {
            this.signUpForm.valueChanges.subscribe(function (data) {
                if (!_this.signUpForm) {
                    return;
                }
                var form = _this.signUpForm.form;
                _this.onValueChanged(form, data);
            });
        }
    };
    CreateUserComponent.prototype.onValueChanged = function (form, data) {
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
    CreateUserComponent.prototype.onSubmit = function () {
        var _this = this;
        var login_name = this.user.login_name;
        var password = this.user.password;
        var mobile_phone = this.user.mobile_phone;
        var email = this.user.email;
        var payload = { login_name: login_name, password: password };
        var sc = this.http.post(this.gs.signUpURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            if (mobile_phone.length == 11 || email.length > 0) {
                var body = req.json();
                if (mobile_phone.length == 11) {
                    payload['mobile_phone'] = mobile_phone;
                    payload['mobile_phone_verified'] = true;
                }
                if (email.length > 0) {
                    payload['email'] = email;
                    payload['email_verified'] = true;
                }
                var url = _this.gs.updateUserURL + body['data']['id'];
                var sc_1 = _this.http.patch(url, payload, _this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
                    sc_1.unsubscribe();
                    _this.completed.emit();
                    _this.gs.showingTopFlashMessageSuccess();
                }, function (err) {
                    console.log(err.toString());
                    _this.gs.showingTopFlashMessageError();
                }, function () {
                });
            }
            else {
                _this.completed.emit();
                _this.gs.showingTopFlashMessageSuccess();
            }
        }, function (err) {
            console.log(err.toString());
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
        this.currentForm.reset();
        this.hide();
    };
    CreateUserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-create-user',
                    templateUrl: './create-user.component.html',
                    styleUrls: ['./create-user.component.css']
                },] },
    ];
    /** @nocollapse */
    CreateUserComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    CreateUserComponent.propDecorators = {
        'currentForm': [{ type: ViewChild, args: ["signUpForm",] },],
        'completed': [{ type: Output },],
    };
    return CreateUserComponent;
}());
//# sourceMappingURL=create-user.component.js.map