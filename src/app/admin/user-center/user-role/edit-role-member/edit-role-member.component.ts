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

  public role: Role = new Role();
  public freeUsers: User[] = [];
  public page: number = 1;
  public pageSize: number = 10;
  public keyword: string = '';

  private subscriptionBySearch: Subscription;
  private searchContentStream = new Subject<string>();

  private params: URLSearchParams = new URLSearchParams();

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
    this.subscriptionBySearch = this.searchContentStream
      .debounceTime(300)
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
                this.refreshRoleUsers();
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

  refreshRoleUsers() {
    let url = this.gs.getUsersURL + '?filter=role_id:in:' + this.role.id.toString();
    let sc = this.http.get(url, { withCredentials: true }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.role.users = data.data;
          sc.unsubscribe();
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
      }
    )
  }

  addMember(uid: number) {
    let url = this.gs.addMemberToRoleURL + this.role.id.toString() + '/' + uid.toString();

    let sc = this.http.post(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
        this.gs.showingTopFlashMessageSuccess();
        this.getFreeUsers();
      },
      (err) => {
        console.log(err);
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
  }

  deleteMember(uid: number) {
    let url = this.gs.deleteMemberFromRoleURL + this.role.id.toString() + '/' + uid.toString();

    let sc = this.http.delete(url, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
        this.gs.showingTopFlashMessageSuccess();
        this.getFreeUsers();
      },
      (err) => {
        console.log(err);
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
  }

  searchContent(keyword: string) {
    this.searchContentStream.next(keyword);
  }

  getFreeUsers() {
    this.searchContentStream.next('');
  }
}
