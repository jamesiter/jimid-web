import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {App} from "../app";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-delete-app',
  templateUrl: './delete-app.component.html',
  styleUrls: ['./delete-app.component.css']
})
export class DeleteAppComponent implements OnInit {

  public app: App = new App();

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(app: App) {
    this.app = app;
    $('#delete_app_modal').modal('show');
  }

  hide() {
    $('#delete_app_modal').modal('hide');
  }

  onSubmit() {
    let url = this.gs.deleteAppURL + this.app.id.toString();

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
