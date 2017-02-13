import { Routes} from "@angular/router";
import {AppListComponent} from "./app-list/app-list.component";
import {OpenidComponent} from "./openid/openid.component";
/**
 * Created by James on 2016/1/11.
 */

export const appManageRoutes: Routes = [
  { path: 'app-list', component: AppListComponent},
  { path: 'openid', component: OpenidComponent},
  { path: '', redirectTo: 'app-list', pathMatch: 'full' },
];

