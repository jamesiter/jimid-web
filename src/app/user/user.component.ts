import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";
import {GlobalService} from "../core/global.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    'assets/src/scss/custom.css',
    './user.component.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  constructor(private http: Http, private gs: GlobalService) { }

  ngOnInit() {
    this.gs.getSelfInfo();
  }
}
