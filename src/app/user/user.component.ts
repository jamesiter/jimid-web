import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalService} from "../core/global.service";
import {Observable, Observer, Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    '../../assets/src/scss/custom.css',
    './user.component.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  private Observable: Observable<number>;
  private sc: Subscription;

  constructor(public gs: GlobalService) {

    this.Observable = Observable.create((observer: Observer<number>) => {
      this.gs.roleObserver = observer;
    });

    this.sc = this.Observable.subscribe(
      (next) => {
        if (next == 1) {
          this.gs.navigate('/admin');
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
}
