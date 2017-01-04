/**
 * Created by James on 2016/12/16.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
// Statics
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {GlobalService} from "./global.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  private Url = '';
  private payload: any;

  public isLoggedIn = false;
  public redirectUrl: string;
  public redirectQueryParams: any;
  constructor(private http: Http, private gs: GlobalService, private router: Router) {}

  login(channel: string, password: string, login_name?: string, mobile_phone?: string, email?: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    this.payload = {login_name, password, mobile_phone, email};

    if (channel == 'email') {

      this.Url = this.gs.signInByEMailURL;

    } else if (channel == 'mobile_phone') {

      this.Url = this.gs.signInByMobilePhoneURL;

    } else {

      this.Url = this.gs.signInURL;

    }
    console.log(this.Url);

    return this.http.post(this.Url, this.payload, options);
  }

  auth(): Observable<Response>{
    return this.http.get(this.gs.authURL, { withCredentials: true });
  }

  logout(): void {
    this.Url = this.gs.signOutURL;
    let sc = this.http.get(this.Url, { withCredentials: true }).subscribe(
      (req) => {
        if (req.status == 200) {
          this.isLoggedIn = false;
          console.log('Logout succeed!');
          this.router.navigate(['/login']);
        }
        sc.unsubscribe();
      },
      (err) => {
        console.log('Logout failed!');
        console.log(err);
      },
      () => {
        console.log('Logout complete!');
      }
    );
  }
}
