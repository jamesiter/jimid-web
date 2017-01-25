import {Component, OnInit, AfterViewInit} from '@angular/core';

import {Http} from "@angular/http";
import {GlobalService} from "../../../core/global.service";
import any = jasmine.any;
import {Role} from "./role";
declare let $: any;

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit, AfterViewInit {

  private roles: Role[] = [];

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getRoles();
  }

  getRoles() {
    let sc = this.http.get(this.gs.getUserRoleAppMappingURL, { withCredentials: true }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.roles = data.data;
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
