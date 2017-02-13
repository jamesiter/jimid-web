import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {Role} from "../role";
declare let $: any;

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent implements OnInit {

  public role: Role = new Role();

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(role: Role) {
    this.role = role;
    $('#delete_role_modal').modal('show');
  }

  hide() {
    $('#delete_role_modal').modal('hide');
  }

  onSubmit() {
    let url = this.gs.deleteRoleURL + this.role.id.toString();

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
