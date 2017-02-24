import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCenterComponent } from './user-center.component';
import { UserListComponent } from "./user-list/user-list.component";
import { UserLogComponent } from "./user-log/user-log.component";
import { FormsModule } from "@angular/forms";
import { CreateUserComponent } from "./user-list/create-user/create-user.component";
import { EditUserComponent } from "./user-list/edit-user/edit-user.component";
import { DeleteUserComponent } from "./user-list/delete-user/delete-user.component";
import { ResetPasswordComponent } from "./user-list/reset-password/reset-password.component";
import { UserRoleComponent } from "./user-role/user-role.component";
import { CreateRoleComponent } from "./user-role/create-role/create-role.component";
import { EditRoleComponent } from "./user-role/edit-role/edit-role.component";
import { EditRoleMemberComponent } from "./user-role/edit-role-member/edit-role-member.component";
import { EditRoleAppComponent } from "./user-role/edit-role-app/edit-role-app.component";
import { DeleteRoleComponent } from "./user-role/delete-role/delete-role.component";
export var UserCenterModule = (function () {
    function UserCenterModule() {
    }
    UserCenterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        UserCenterComponent,
                        UserListComponent, CreateUserComponent, EditUserComponent, DeleteUserComponent, ResetPasswordComponent,
                        UserLogComponent,
                        UserRoleComponent, CreateRoleComponent, EditRoleComponent, EditRoleMemberComponent, EditRoleAppComponent,
                        DeleteRoleComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    UserCenterModule.ctorParameters = [];
    return UserCenterModule;
}());
//# sourceMappingURL=user-center.module.js.map