import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalService} from "../core/global.service";
import {Observable, Observer, Subscription} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    '../../assets/src/scss/custom.css',
    './admin.component.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  private Observable: Observable<number>;
  private sc: Subscription;

  constructor(public gs: GlobalService) {

    this.Observable = Observable.create((observer: Observer<number>) => {
      this.gs.roleObserver = observer;
    });

    this.sc = this.Observable.subscribe(
      (next) => {
        if (next != 1) {
          this.gs.navigate('/user');
        }
        this.sc.unsubscribe();
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.sc.unsubscribe();
      }
    )
  }

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

