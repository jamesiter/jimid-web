import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
import { Role } from "../role";
export var CreateRoleComponent = (function () {
    function CreateRoleComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.role = new Role();
        this.completed = new EventEmitter();
        this.formErrors = {
            'name': '',
            'remark': ''
        };
        this.validationMessages = {
            'name': {
                'required': '角色名为必填字段。',
                'minlength': '角色名不得少于5个字符。',
                'maxlength': '角色名不得超30个字符。'
            },
            'remark': {
                'maxlength': '备注长度不得超255个字符。'
            }
        };
    }
    CreateRoleComponent.prototype.ngOnInit = function () {
    };
    CreateRoleComponent.prototype.ngAfterViewChecked = function () {
        this.FormChanged();
    };
    CreateRoleComponent.prototype.show = function () {
        $('#create_role_modal').modal('show');
    };
    CreateRoleComponent.prototype.hide = function () {
        $('#create_role_modal').modal('hide');
    };
    CreateRoleComponent.prototype.FormChanged = function () {
        var _this = this;
        if (this.currentForm === this.createRoleForm) {
            return;
        }
        this.createRoleForm = this.currentForm;
        if (this.createRoleForm) {
            this.createRoleForm.valueChanges.subscribe(function (data) {
                if (!_this.createRoleForm) {
                    return;
                }
                var form = _this.createRoleForm.form;
                _this.onValueChanged(form, data);
            });
        }
    };
    CreateRoleComponent.prototype.onValueChanged = function (form, data) {
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
    CreateRoleComponent.prototype.onSubmit = function () {
        var _this = this;
        var name = this.role.name;
        var remark = this.role.remark;
        var payload = { name: name, remark: remark };
        var sc = this.http.post(this.gs.createRoleURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.completed.emit();
            _this.gs.showingTopFlashMessageSuccess();
        }, function (err) {
            console.log(err.toString());
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
        this.currentForm.reset();
        this.hide();
    };
    CreateRoleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-create-role',
                    templateUrl: './create-role.component.html',
                    styleUrls: ['./create-role.component.css']
                },] },
    ];
    /** @nocollapse */
    CreateRoleComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    CreateRoleComponent.propDecorators = {
        'currentForm': [{ type: ViewChild, args: ["createRoleForm",] },],
        'completed': [{ type: Output },],
    };
    return CreateRoleComponent;
}());
//# sourceMappingURL=create-role.component.js.map