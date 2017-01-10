import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {GlobalService} from "../../core/global.service";
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {

  @Input() login_name: string = '';
  /*
  private topNavTipObservable: Observable<string>;
  private sc;
  */

  constructor(private authService: AuthService, private gs: GlobalService) {
    /* this.topNavTipObservable = Observable.create((observer:Observer<string>) => {
      this.gs.topNavTipObserver = observer;
    });
    this.sc = this.topNavTipObservable.subscribe(
      (next) => {

      },
      (err) => {
        console.log(err);
      },
      () => {
        this.sc.unsubscribe();
      }
    )*/
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
