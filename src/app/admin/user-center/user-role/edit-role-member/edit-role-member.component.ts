import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {Role} from "../role";
import {User} from "../../user-list/user";
import {Subscription, Subject} from "rxjs";
declare let $: any;

@Component({
  selector: 'app-edit-role-member',
  templateUrl: './edit-role-member.component.html',
  styleUrls: ['./edit-role-member.component.css']
})
export class EditRoleMemberComponent implements OnInit {

  private role: Role = new Role();
  private freeUsers: User[] = [];
  private page: number = 1;
  private pageSize: number = 10;
  private keyword: string = '';

  private subscriptionBySearch: Subscription;
  private searchContentStream = new Subject<string>();

  private params: URLSearchParams = new URLSearchParams();

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
    this.subscriptionBySearch = this.searchContentStream
      .debounceTime(300)
      .distinctUntilChanged()
      .do(
        (keyword: string) => {
          this.keyword = keyword;
        }
      ).subscribe(
        (next) => {
          this.params.set('keyword', this.keyword.toString());
          let sc = this.http.get(this.gs.searchRoleFreeUsersURL, { withCredentials: true, search: this.params }).subscribe(
            (req) => {
              if (req.status == 200) {
                let data = req.json();
                this.freeUsers = data.data;
                sc.unsubscribe();
              }
            },
            (err) => {
              console.log(err);
            },
            () => {
            }
          )
        },
        (err) => {
          console.log(err);
        },
        () => {
        }
      );
  }

  ngOnInit() {
    this.params.set('page', this.page.toString());
    this.params.set('page_size', this.pageSize.toString());
    this.getFreeUsers();
  }

  show(role: Role) {
    this.role = role;
    $('#edit_role_member_modal').modal('show');
  }

  hide() {
    $('#edit_role_member_modal').modal('hide');
  }

  addMember(uid) {
    let url = this.gs.addMemberToRoleURL + this.role.id.toString() + '/' + uid.toString();

    let sc = this.http.post(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(
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

    this.getFreeUsers();
  }

  deleteMember(uid) {
    let url = this.gs.deleteMemberFromRoleURL + this.role.id.toString() + '/' + uid.toString();

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

    this.getFreeUsers();
  }

  searchContent(keyword) {
    this.searchContentStream.next(keyword);
  }

  getFreeUsers() {
    this.searchContentStream.next('');
  }
}
