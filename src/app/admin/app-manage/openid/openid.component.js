import { Component } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { GlobalService } from "../../../core/global.service";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
export var OpenidComponent = (function () {
    function OpenidComponent(http, gs, activatedRoute) {
        var _this = this;
        this.http = http;
        this.gs = gs;
        this.activatedRoute = activatedRoute;
        this.openids = [];
        this.page = 1;
        this.pages = [];
        this.pageSize = 10;
        this.pageTotal = 0;
        this.pageWidth = 10;
        this.balanceOfPower = Math.floor(this.pageWidth / 2) + 1;
        this.lastPagination = Math.ceil(this.pageTotal / this.pageSize);
        this.startPagination = 1;
        this.endPagination = this.lastPagination;
        this.keyword = '';
        this.searchContentStream = new Subject();
        this.subscription = this.activatedRoute.queryParams.subscribe(function (queryParams) {
            _this.page = +queryParams['page'] || _this.page;
            _this.pageSize = +queryParams['page_size'] || _this.pageSize;
            _this.keyword = queryParams['keyword'] || _this.keyword;
            _this.getOpenids();
        }, function (err) {
            console.log(err);
        }, function () {
            console.log('complete!');
        });
        this.subscriptionBySearch = this.searchContentStream
            .debounceTime(300)
            .distinctUntilChanged()
            .do(function (keyword) {
            _this.keyword = keyword;
        }).subscribe(function (next) {
            var params = {};
            params['page'] = _this.page.toString();
            params['page_size'] = _this.pageSize.toString();
            if (_this.keyword.length > 0) {
                params['keyword'] = _this.keyword.toString();
            }
            _this.gs.navigate('/admin/app-manage/openid', params);
        }, function (err) {
            console.log(err);
        }, function () {
        });
    }
    OpenidComponent.prototype.searchContent = function (keyword) {
        this.page = 1;
        this.searchContentStream.next(keyword);
    };
    OpenidComponent.prototype.ngOnInit = function () {
    };
    OpenidComponent.prototype.ngAfterViewInit = function () {
    };
    OpenidComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.subscriptionBySearch.unsubscribe();
    };
    OpenidComponent.prototype.getOpenids = function () {
        var _this = this;
        var params = new URLSearchParams();
        params.set('page', this.page.toString());
        params.set('page_size', this.pageSize.toString());
        if (this.keyword.length > 0) {
            params.set('keyword', this.keyword.toString());
        }
        var sc = this.http.get(this.gs.searchOpenidsURL, { withCredentials: true, search: params }).subscribe(function (req) {
            if (req.status == 200) {
                var data = req.json();
                _this.pageTotal = data.paging.total;
                _this.openids = data.data;
                _this.refreshPageState();
                sc.unsubscribe();
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    OpenidComponent.prototype.refresh = function () {
        var params = {};
        params['page'] = this.page.toString();
        params['page_size'] = this.pageSize.toString();
        if (this.keyword.length > 0) {
            params['keyword'] = this.keyword.toString();
        }
        this.gs.navigate('/admin/app-manage/openid', params);
    };
    ;
    OpenidComponent.prototype.changePage = function (thePage) {
        this.page = thePage;
        this.refresh();
    };
    OpenidComponent.prototype.changePageSize = function (thePageSize) {
        this.pageSize = thePageSize;
        this.page = 1;
        this.refresh();
    };
    OpenidComponent.prototype.refreshPageState = function () {
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
            }
            else {
                this.endPagination = this.page + (this.pageWidth - this.balanceOfPower);
            }
        }
        else {
            if (this.lastPagination > this.pageWidth && (this.endPagination - this.startPagination) < this.pageWidth) {
                this.startPagination = this.lastPagination - (this.pageWidth - 1);
            }
        }
        while (this.pages.length) {
            this.pages.pop();
        }
        for (var _i = this.startPagination; _i <= this.endPagination; _i++) {
            this.pages.push(_i);
        }
    };
    OpenidComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-openid',
                    templateUrl: './openid.component.html',
                    styleUrls: ['./openid.component.css']
                },] },
    ];
    /** @nocollapse */
    OpenidComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
        { type: ActivatedRoute, },
    ];
    return OpenidComponent;
}());
//# sourceMappingURL=openid.component.js.map