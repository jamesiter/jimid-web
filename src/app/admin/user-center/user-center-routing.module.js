"use strict";
var user_log_component_1 = require("./user-log/user-log.component");
var user_list_component_1 = require("./user-list/user-list.component");
/**
 * Created by James on 2016/12/14.
 */
exports.userCenterRoutes = [
    { path: 'user-list', component: user_list_component_1.UserListComponent },
    { path: 'user-log', component: user_log_component_1.UserLogComponent },
    { path: '', redirectTo: 'user-list', pathMatch: 'full' },
];
//# sourceMappingURL=user-center-routing.module.js.map