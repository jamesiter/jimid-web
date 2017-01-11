import { Routes} from "@angular/router";
import {AppListComponent} from "./app-list/app-list.component";
/**
 * Created by James on 2016/1/11.
 */

export const appManageRoutes: Routes = [
  { path: 'app-list', component: AppListComponent},
  { path: '', redirectTo: 'app-list', pathMatch: 'full' },
];

