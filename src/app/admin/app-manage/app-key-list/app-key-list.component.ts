import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AppKey} from "./app-key";
import {Http} from "@angular/http";
import {GlobalService} from "../../../core/global.service";

@Component({
  selector: 'app-app-list',
  templateUrl: './app-key-list.component.html',
  styleUrls: ['./app-key-list.component.css']
})
export class AppKeyListComponent implements OnInit, AfterViewInit {

  private appKeys: AppKey[] = [];

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getAppKeys();
  }

  getAppKeys() {
    let sc = this.http.get(this.gs.searchAppKeysURL + '?order_by=create_time', { withCredentials: true }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.appKeys = data.data;
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
