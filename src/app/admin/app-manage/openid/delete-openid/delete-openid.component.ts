import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {Openid} from "../openid";
import {App} from "../../app-list/app";
import {User} from "../../../user-center/user-list/user";
declare let $: any;

@Component({
  selector: 'app-delete-openid',
  templateUrl: './delete-openid.component.html',
  styleUrls: ['./delete-openid.component.css']
})
export class DeleteOpenidComponent implements OnInit {

  public openid: Openid = new Openid();
  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
    this.openid.app = new App();
    this.openid.user = new User();
  }

  ngOnInit() {
  }

  show(openid: Openid) {
    this.openid = openid;
    $('#delete_openid_modal').modal('show');
  }

  hide() {
    $('#delete_openid_modal').modal('hide');
  }

  onSubmit() {
    let url = this.gs.deleteOpenidURL + this.openid.appid.toString() + '/' + this.openid.uid.toString();

    let sc = this.http.delete(url, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
        this.gs.showingTopFlashMessageSuccess();
      },
      (err) => {
        console.log(err);
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
    this.hide();
  }
}
