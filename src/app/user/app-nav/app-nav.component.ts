import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Http} from "@angular/http";
import {GlobalService} from "../../core/global.service";
import {AppKey} from "../../admin/app-manage/app-key-list/app-key";

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit, AfterViewInit {
  private appList: AppKey[] = [];

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getAppList();
  }

  getAppList() {
    let sc = this.http.get(this.gs.getSelfAppListURL + '?order_by=create_time', { withCredentials: true }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.appList = data.data;
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
