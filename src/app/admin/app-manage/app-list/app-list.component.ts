import {Component, OnInit, AfterViewInit} from '@angular/core';
import {App} from "./app";
import {Http} from "@angular/http";
import {GlobalService} from "../../../core/global.service";

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit, AfterViewInit {

  public apps: App[] = [];

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getApps();
  }

  getApps() {
    let sc = this.http.get(this.gs.searchAppsURL + '?order_by=create_time', { withCredentials: true }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.apps = data.data;
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
