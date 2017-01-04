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

  private current_user: any = {};

  constructor(private http: Http, private gs: GlobalService) { }

  ngOnInit() {
    this.getSelfInfo();
  }

  getSelfInfo(): Promise<Response> {
    return this.http.get(this.gs.getSelfInfoURL, { withCredentials: true })
      .toPromise()
      .then(this.extractData.bind(this))
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status == 200) {
      this.current_user = res.json().data || {};
    }

    return { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return {};
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

