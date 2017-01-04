"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var user_center_component_1 = require('./user-center.component');
var user_list_component_1 = require("./user-list/user-list.component");
var user_log_component_1 = require("./user-log/user-log.component");
var UserCenterModule = (function () {
    function UserCenterModule() {
    }
    UserCenterModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
            ],
            declarations: [user_center_component_1.UserCenterComponent, user_list_component_1.UserListComponent, user_log_component_1.UserLogComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], UserCenterModule);
    return UserCenterModule;
}());
exports.UserCenterModule = UserCenterModule;
//# sourceMappingURL=user-center.module.js.map