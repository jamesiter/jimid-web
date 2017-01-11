import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, AfterViewChecked, NgModule} from '@angular/core';

import {Http, URLSearchParams} from "@angular/http";
import {GlobalService} from "../../../core/global.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription, Subject} from "rxjs";
import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],

})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {

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

  batchEnableUser() {
    let ids = [];
    $("tbody tr").find('td input[type="checkbox"]:eq(0):checked').parent().next().each(function(i, ele) {
      ids.push($(ele).text());
    });

    let sc = this.http.patch(this.gs.updateUsersURL, {'ids': ids.join(','), 'enabled': true}, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.gs.showingTopFlashMessageSuccess();
        this.getUsers();
      },
      (err) => {
        console.log(err.toString());
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
  }

  batchDisableUser() {
    let ids = [];
    $("tbody tr").find('td input[type="checkbox"]:eq(0):checked').parent().next().each(function(i, ele) {
      ids.push($(ele).text());
    });

    let sc = this.http.patch(this.gs.updateUsersURL, {'ids': ids.join(','), 'enabled': false}, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.gs.showingTopFlashMessageSuccess();
        this.getUsers();
      },
      (err) => {
        console.log(err.toString());
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
  }

  enableUser(id) {
    let url = this.gs.enableUserURL + id.toString();
    let sc = this.http.patch(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.getUsers();
      },
      (err) => {
        console.log(err.toString());
      },
      () => {
      }
    );
  }

  disableUser(id) {
    let url = this.gs.disableUserURL + id.toString();
    let sc = this.http.patch(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.getUsers();
      },
      (err) => {
        console.log(err.toString());
      },
      () => {
      }
    );
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
}
