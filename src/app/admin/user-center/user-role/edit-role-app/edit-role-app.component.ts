import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {Role} from "../role";
import {AppKey} from "../../../app-manage/app-key-list/app-key";
declare let $: any;

@Component({
  selector: 'app-edit-role-app',
  templateUrl: './edit-role-app.component.html',
  styleUrls: ['./edit-role-app.component.css']
})
export class EditRoleAppComponent implements OnInit {

  private role: Role = new Role();
  private otherApps: AppKey[] = [];
  private page: number = 1;
  private pageSize: number = 10;

  private params: URLSearchParams = new URLSearchParams();

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
    this.params.set('page', this.page.toString());
    this.params.set('page_size', this.pageSize.toString());
  }

  show(role: Role) {
    this.role = role;
    $('#edit_role_app_modal').modal('show');
    this.refreshRoleApps();
  }

  hide() {
    $('#edit_role_app_modal').modal('hide');
  }

  refreshRoleApps() {
    let url = this.gs.getAppByRoleIDURL + this.role.id.toString();
    let sc = this.http.get(url, { withCredentials: true }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.role.apps = data.data;
          this.getOtherApps();
          sc.unsubscribe();
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
      }
    )
  }

  addApp(appid) {
    let url = this.gs.addAppToRoleURL + this.role.id.toString() + '/' + appid.toString();

    let sc = this.http.post(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
        this.gs.showingTopFlashMessageSuccess();
        this.refreshRoleApps();
      },
      (err) => {
        console.log(err);
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
  }

  deleteApp(appid) {
    let url = this.gs.deleteAppFromRoleURL + this.role.id.toString() + '/' + appid.toString();

    let sc = this.http.delete(url, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
        this.gs.showingTopFlashMessageSuccess();
        this.refreshRoleApps();
      },
      (err) => {
        console.log(err);
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
  }

  getOtherApps() {
    let ids = [];
    for (let app of this.role.apps) {
      ids.push(app['id'])
    }

    let url = this.gs.getRoleOtherAppsURL + '?filter=id:notin:' + ids.join(',');

    let sc = this.http.get(url, { withCredentials: true }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.otherApps = data.data;
          sc.unsubscribe();
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
      }
    )
  }
}
