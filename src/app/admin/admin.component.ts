import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http, Response} from "@angular/http";
import {GlobalService} from "../core/global.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    'assets/src/scss/custom.css',
    './admin.component.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  constructor(private http: Http, private gs: GlobalService) { }

  ngOnInit() {
    this.gs.getSelfInfo();
  }
  /*
  'vendors/bootstrap/dist/css/bootstrap.min.css',
  'vendors/font-awesome/css/font-awesome.min.css',
  'vendors/nprogress/nprogress.css',
  'vendors/iCheck/skins/flat/green.css',
  'vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css',
  'vendors/jqvmap/dist/jqvmap.min.css',
  'vendors/bootstrap-daterangepicker/daterangepicker.css',
  'assets/src/scss/custom.css',
  */
}

