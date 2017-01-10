import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {User} from "../user";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  public user: User = new User();

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(user: User) {
    this.user = user;
    $('#delete_user_modal').modal('show');
  }

  hide() {
    $('#delete_user_modal').modal('hide');
  }

  onSubmit() {
    let url = this.gs.deleteUserURL + this.user.id.toString();

    let sc = this.http.delete(url, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
        this.gs.showingTopFlashMessageLoading();
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
