import { Routes} from "@angular/router";
import {AppKeyListComponent} from "./app-key-list/app-key-list.component";
import {OpenidComponent} from "./openid/openid.component";
/**
 * Created by James on 2016/1/11.
 */

export const appManageRoutes: Routes = [
  { path: 'app-list', component: AppKeyListComponent},
  { path: 'openid', component: OpenidComponent},
  { path: '', redirectTo: 'app-list', pathMatch: 'full' },
];

