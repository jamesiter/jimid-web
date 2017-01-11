import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AppKey} from "../app-key";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-delete-app-key',
  templateUrl: './delete-app-key.component.html',
  styleUrls: ['./delete-app-key.component.css']
})
export class DeleteAppKeyComponent implements OnInit {

  public appKey: AppKey = new AppKey();

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(appKey: AppKey) {
    this.appKey = appKey;
    $('#delete_app_key_modal').modal('show');
  }

  hide() {
    $('#delete_app_key_modal').modal('hide');
  }

  onSubmit() {
    let url = this.gs.deleteAppKeyURL + this.appKey.id.toString();

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
