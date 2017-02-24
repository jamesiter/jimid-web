import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Router, ActivatedRoute} from "@angular/router";
import {LoginUser} from "./login-user";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {GlobalService} from "../core/global.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../vendors/bootstrap/dist/css/bootstrap.min.css',
    '../../vendors/font-awesome/css/font-awesome.min.css',
    '../../vendors/nprogress/nprogress.css',
    '../../vendors/animate.css/animate.min.css',
    '../../assets/src/scss/custom.css',
    './login.component.css',
  ],
  encapsulation: ViewEncapsulation.Native
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginUser = new LoginUser();

  constructor(private http: Http, private gs: GlobalService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.auth();
  }

  auth() {
    let sc = this.authService.auth().subscribe(
      (req) => {
        if (req.status == 200) {
          this.authService.isLoggedIn = true;
          console.log('Auth succeed!');
          this.router.navigate([this.authService.redirectUrl], {queryParams: this.authService.redirectQueryParams});
        } else if (req.status == 278) {
          let body = req.json();
          // window.location.href = body['redirect']['location'];
          this.router.navigate(['/login']);
        }
        sc.unsubscribe();
      },
      (err) => {
        console.log('Auth failed!');
        console.log(err);
      },
      () => {
        console.log('Auth complete!');
        console.log(this.authService.isLoggedIn);
      }
    );
  }

  login() {
    let sc = this.authService.login('login_name', this.loginUser.password, this.loginUser.login_name,
      this.loginUser.mobile_phone, this.loginUser.email).subscribe(
      (req) => {
        if (req.status == 200) {

          this.authService.isLoggedIn = true;
          this.router.navigate(['/']);
          console.log('Login succeed!');

        } else {
          this.authService.isLoggedIn = false;
          this.router.navigate(['/login']);
        }
        sc.unsubscribe();
      },
      (err) => {
        this.authService.isLoggedIn = false;
        this.router.navigate(['/login']);
        console.log('Login failed!');
        console.log(err);
        return Observable.throw(err);
      },
      () => {
        console.log('Login complete!');
      }
    );
  }
}

