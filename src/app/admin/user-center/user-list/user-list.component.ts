import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, AfterViewChecked} from '@angular/core';

import {Http, URLSearchParams, Headers, RequestOptions} from "@angular/http";
import {GlobalService} from "../../../core/global.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription, Subject} from "rxjs";
import {NgForm} from "@angular/forms";
import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  private users: any[] = [];
  private page: number = 1;
  private pages: number[] = [];
  private pageSize: number = 10;
  private pageTotal: number = 0;
  private pageWidth: number = 10;
  private balanceOfPower = Math.floor(this.pageWidth / 2) + 1;
  private lastPagination = Math.ceil(this.pageTotal / this.pageSize);
  private startPagination = 1;
  private endPagination = this.lastPagination;
  private keyword: string = '';

  private subscription: Subscription;
  private subscriptionBySearch: Subscription;
  private searchContentStream = new Subject<string>();

  private signUpForm: NgForm;
  @ViewChild("signUpForm") currentForm: NgForm;
  private signUpLoginName = '';
  private signUpPassword = '';
  private signUpMobilePhone = '';
  private signUpEMail = '';

  constructor(private http: Http, private gs: GlobalService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.page = +queryParams['page'] || this.page;
        this.pageSize = +queryParams['page_size'] || this.pageSize;
        this.keyword = queryParams['keyword'] || this.keyword;
        this.getUsers();
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('complete!');
      }
    );

    this.subscriptionBySearch = this.searchContentStream
      .debounceTime(300)
      .distinctUntilChanged()
      .do(
        (keyword: string) => {
          this.keyword = keyword;
        }
      ).subscribe(
        (next) => {
          let params = {};
          params['page'] = this.page.toString();
          params['page_size'] = this.pageSize.toString();
          if (this.keyword.length > 0) {
            params['keyword'] = this.keyword.toString();
          }
          this.navigate(params);
        },
        (err) => {
          console.log(err);
        },
        () => {
        }
      );
  }

  searchContent(keyword) {
    this.page = 1;
    this.searchContentStream.next(keyword);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionBySearch.unsubscribe();
  }

  UIControl() {
    if ($("input.flat")[0]) {
      $('input.flat').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
      });
    }

    var checkState = '';

    $('.bulk_action input').on('ifChecked', function () {
      checkState = '';
      $(this).parent().parent().parent().addClass('selected');
      countChecked();
    });
    $('.bulk_action input').on('ifUnchecked', function () {
      checkState = '';
      $(this).parent().parent().parent().removeClass('selected');
      countChecked();
    });
    $('.bulk_action input#check-all').on('ifChecked', function () {
      checkState = 'all';
      countChecked();
    });
    $('.bulk_action input#check-all').on('ifUnchecked', function () {
      checkState = 'none';
      countChecked();
    });

    function countChecked() {
      if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
      }
      if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
      }
    }
  }

  getUsers() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.page.toString());
    params.set('page_size', this.pageSize.toString());
    if (this.keyword.length > 0) {
      params.set('keyword', this.keyword.toString());
    }

    let sc = this.http.get(this.gs.searchUsersURL, { withCredentials: true, search: params }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.pageTotal = data.paging.total;
          this.users = data.data;
          this.UIControl();
          this.refreshPageState();
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

  addUser() {

  }

  deleteUsers() {

  }

  updateUser() {

  }

  refresh() {
    let params = {};
    params['page'] = this.page.toString();
    params['page_size'] = this.pageSize.toString();
    if (this.keyword.length > 0) {
      params['keyword'] = this.keyword.toString();
    }

    this.navigate(params);
  };

  changePage(thePage) {
    this.page = thePage;

    this.refresh();
  }

  changePageSize(thePageSize) {
    this.pageSize = thePageSize;
    this.page = 1;

    this.refresh();
  }

  navigate(queryParams) {
    this.router.navigate(['/admin/user/user-list'], {queryParams: queryParams});
  }

  refreshPageState() {
    this.lastPagination = Math.ceil(this.pageTotal / this.pageSize);
    this.startPagination = 1;
    this.endPagination = this.lastPagination;

    if (this.page > this.balanceOfPower) {
      this.startPagination = this.page - Math.floor(this.pageWidth / 2);
    }

    if (this.page < this.lastPagination - (this.pageWidth - this.balanceOfPower)) {
      if (this.page < this.balanceOfPower) {
        if (this.lastPagination > this.pageWidth) {
          this.endPagination = this.pageWidth;
        }
      } else {
        this.endPagination = this.page + (this.pageWidth - this.balanceOfPower);
      }
    } else {
      if (this.lastPagination > this.pageWidth && (this.endPagination - this.startPagination) < this.pageWidth) {
        this.startPagination = this.lastPagination - (this.pageWidth - 1);
      }
    }
    while (this.pages.length) {
      this.pages.pop();
    }
    for (let _i = this.startPagination; _i <= this.endPagination; _i++) {
      this.pages.push(_i);
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.signUpForm) { return; }
    this.signUpForm = this.currentForm;
    if (this.signUpForm) {
      this.signUpForm.valueChanges.subscribe(
        (data) => {
          this.onValueChanged(data);
        }
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.signUpForm) { return; }
    const form = this.signUpForm.form;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'login_name': '',
    'password': '',
    'mobile_phone': '',
    'email': ''
  };

  validationMessages = {
    'login_name': {
      'required': '用户名为必填字段。',
      'minlength': '用户名不得少于5个字符。',
      'maxlength': '用户名不得超30个字符。'
    },
    'password': {
      'required': '密码为必填字段。',
      'minlength': '密码长度不得少于6个字符。',
      'maxlength': '密码长度不得超100个字符。'
    },
    'mobile_phone': {
      'pattern': '请输入有效的手机号码。'
    },
    'email': {
      'pattern': '请输入有效的E-Mail地址。'
    }
  };

  onSubmit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let login_name = this.signUpLoginName;
    let password = this.signUpPassword;
    let mobile_phone = this.signUpMobilePhone;
    let email = this.signUpEMail;
    let payload = {login_name, password};
    let sc = this.http.post(this.gs.signUpURL, payload, options).subscribe(
      (req) => {
        sc.unsubscribe();
        if (mobile_phone.length == 11 || email.length > 0) {
          let body = req.json();
          let id = body['data']['id'];

          let payload = {id};
          if (mobile_phone.length == 11) {
            payload['mobile_phone'] = mobile_phone;
            payload['mobile_phone_verified'] = true;
          }
          if (email.length > 0) {
            payload['email'] = email;
            payload['email_verified'] = true;
          }
          let sc = this.http.patch(this.gs.updateUserURL, payload, options).subscribe(
            (req) => {
              sc.unsubscribe();
              window.location.reload();
            },
            (err) => {
              console.log(err);
            },
            () => {
            }
          );
        } else {
          window.location.reload();
        }
        this.currentForm.reset();
        $('#create_user_modal').modal('hide');
      },
      (err) => {
        console.log(err);
      },
      () => {
      }
    );
  }
}
