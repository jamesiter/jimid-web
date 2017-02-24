import { AppListComponent } from "./app-list/app-list.component";
import { OpenidComponent } from "./openid/openid.component";
/**
 * Created by James on 2016/1/11.
 */
export var appManageRoutes = [
    { path: 'app-list', component: AppListComponent },
    { path: 'openid', component: OpenidComponent },
    { path: '', redirectTo: 'app-list', pathMatch: 'full' },
];
//# sourceMappingURL=app-manage-routing.module.js.map