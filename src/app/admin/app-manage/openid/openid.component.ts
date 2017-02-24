import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {GlobalService} from "../../../core/global.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription, Subject} from "rxjs";
import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-openid',
  templateUrl: './openid.component.html',
  styleUrls: ['./openid.component.css']
})
export class OpenidComponent implements OnInit, AfterViewInit, OnDestroy {

  public openids: any[] = [];
  public page: number = 1;
  public pages: number[] = [];
  public pageSize: number = 10;
  public pageTotal: number = 0;
  public pageWidth: number = 10;
  public balanceOfPower = Math.floor(this.pageWidth / 2) + 1;
  public lastPagination = Math.ceil(this.pageTotal / this.pageSize);
  public startPagination = 1;
  public endPagination = this.lastPagination;
  public keyword: string = '';

  private subscription: Subscription;
  private subscriptionBySearch: Subscription;
  private searchContentStream = new Subject<string>();

  constructor(private http: Http, private gs: GlobalService, private activatedRoute: ActivatedRoute) {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.page = +queryParams['page'] || this.page;
        this.pageSize = +queryParams['page_size'] || this.pageSize;
        this.keyword = queryParams['keyword'] || this.keyword;
        this.getOpenids();
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
          this.gs.navigate('/admin/app-manage/openid', params);
        },
        (err) => {
          console.log(err);
        },
        () => {
        }
      );
  }

  searchContent(keyword: string) {
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

  getOpenids() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.page.toString());
    params.set('page_size', this.pageSize.toString());
    if (this.keyword.length > 0) {
      params.set('keyword', this.keyword.toString());
    }

    let sc = this.http.get(this.gs.searchOpenidsURL, { withCredentials: true, search: params }).subscribe(
      (req) => {
        if (req.status == 200) {
          let data = req.json();
          this.pageTotal = data.paging.total;
          this.openids = data.data;
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

  refresh() {
    let params = {};
    params['page'] = this.page.toString();
    params['page_size'] = this.pageSize.toString();
    if (this.keyword.length > 0) {
      params['keyword'] = this.keyword.toString();
    }

    this.gs.navigate('/admin/app-manage/openid', params);
  };

  changePage(thePage: number) {
    this.page = thePage;

    this.refresh();
  }

  changePageSize(thePageSize: number) {
    this.pageSize = thePageSize;
    this.page = 1;

    this.refresh();
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
