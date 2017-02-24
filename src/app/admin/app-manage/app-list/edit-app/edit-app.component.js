import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
import { App } from "../app";
export var EditAppComponent = (function () {
    function EditAppComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.app = new App();
        this.completed = new EventEmitter();
        this.formErrors = {
            'name': '',
            'home_page': '',
            'remark': ''
        };
        this.validationMessages = {
            'name': {
                'required': '应用名称为必填字段。',
                'minlength': '应用名称不得少于1个字符。',
                'maxlength': '应用名称不得超40个字符。'
            },
            'home_page': {
                'required': '应用入口为必填字段。',
                'minlength': '应用入口不得少于1个字符。',
                'maxlength': '应用入口不得超40个字符。'
            },
            'remark': {
                'required': '备注为必填字段。',
                'minlength': '备注不得少于1个字符。',
                'maxlength': '备注不得超40个字符。'
            }
        };
    }
    EditAppComponent.prototype.ngOnInit = function () {
    };
    EditAppComponent.prototype.show = function (app) {
        this.app = app;
        $('#edit_app_modal').modal('show');
    };
    EditAppComponent.prototype.hide = function () {
        $('#edit_app_modal').modal('hide');
    };
    EditAppComponent.prototype.ngAfterViewChecked = function () {
        this.FormChanged();
    };
    EditAppComponent.prototype.FormChanged = function () {
        var _this = this;
        if (this.currentForm === this.updateAppForm) {
            return;
        }
        this.updateAppForm = this.currentForm;
        if (this.updateAppForm) {
            this.updateAppForm.valueChanges.subscribe(function (data) {
                if (!_this.updateAppForm) {
                    return;
                }
                var form = _this.updateAppForm.form;
                _this.onValueChanged(form, data);
            });
        }
    };
    EditAppComponent.prototype.onValueChanged = function (form, data) {
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
    EditAppComponent.prototype.onSubmit = function () {
        var _this = this;
        var name = this.app.name;
        var home_page = this.app.home_page;
        var remark = this.app.remark;
        var payload = { name: name, home_page: home_page, remark: remark };
        var url = this.gs.updateAppURL + this.app.id;
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
    EditAppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-edit-app',
                    templateUrl: './edit-app.component.html',
                    styleUrls: ['./edit-app.component.css']
                },] },
    ];
    /** @nocollapse */
    EditAppComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    EditAppComponent.propDecorators = {
        'currentForm': [{ type: ViewChild, args: ["updateAppForm",] },],
        'completed': [{ type: Output },],
    };
    return EditAppComponent;
}());
//# sourceMappingURL=edit-app.component.js.map