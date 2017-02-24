import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { App } from "../app";
import { Http } from "@angular/http";
import { GlobalService } from "../../../../core/global.service";
export var CreateAppComponent = (function () {
    function CreateAppComponent(http, gs) {
        this.http = http;
        this.gs = gs;
        this.app = new App();
        this.completed = new EventEmitter();
        this.formErrors = {
            'name': ''
        };
        this.validationMessages = {
            'name': {
                'required': '应用名目为必填字段。',
                'minlength': '应用名称不得少于2个字符。',
                'maxlength': '应用名称不得超30个字符。'
            }
        };
    }
    CreateAppComponent.prototype.ngOnInit = function () {
    };
    CreateAppComponent.prototype.ngAfterViewChecked = function () {
        this.FormChanged();
    };
    CreateAppComponent.prototype.show = function () {
        $('#create_app_modal').modal('show');
    };
    CreateAppComponent.prototype.hide = function () {
        $('#create_app_modal').modal('hide');
    };
    CreateAppComponent.prototype.FormChanged = function () {
        var _this = this;
        if (this.currentForm === this.createAppForm) {
            return;
        }
        this.createAppForm = this.currentForm;
        if (this.createAppForm) {
            this.createAppForm.valueChanges.subscribe(function (data) {
                if (!_this.createAppForm) {
                    return;
                }
                var form = _this.createAppForm.form;
                _this.onValueChanged(form, data);
            });
        }
    };
    CreateAppComponent.prototype.onValueChanged = function (form, data) {
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
    CreateAppComponent.prototype.onSubmit = function () {
        var _this = this;
        var name = this.app.name;
        var home_page = this.app.home_page;
        var remark = this.app.remark;
        var payload = { name: name, home_page: home_page, remark: remark };
        var sc = this.http.post(this.gs.createAppURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
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
    CreateAppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-create-app',
                    templateUrl: './create-app.component.html',
                    styleUrls: ['./create-app.component.css']
                },] },
    ];
    /** @nocollapse */
    CreateAppComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
    ];
    CreateAppComponent.propDecorators = {
        'currentForm': [{ type: ViewChild, args: ["createAppForm",] },],
        'completed': [{ type: Output },],
    };
    return CreateAppComponent;
}());
//# sourceMappingURL=create-app.component.js.map