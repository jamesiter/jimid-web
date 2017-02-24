import { Component } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { GlobalService } from "../../../core/global.service";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
export var UserListComponent = (function () {
    function UserListComponent(http, gs, activatedRoute) {
        var _this = this;
        this.http = http;
        this.gs = gs;
        this.activatedRoute = activatedRoute;
        this.users = [];
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
            _this.getUsers();
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
            _this.gs.navigate('/admin/user/user-list', params);
        }, function (err) {
            console.log(err);
        }, function () {
        });
    }
    UserListComponent.prototype.searchContent = function (keyword) {
        this.page = 1;
        this.searchContentStream.next(keyword);
    };
    UserListComponent.prototype.ngOnInit = function () {
    };
    UserListComponent.prototype.ngAfterViewInit = function () {
    };
    UserListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.subscriptionBySearch.unsubscribe();
    };
    UserListComponent.prototype.UIControl = function () {
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
    };
    UserListComponent.prototype.getUsers = function () {
        var _this = this;
        var params = new URLSearchParams();
        params.set('page', this.page.toString());
        params.set('page_size', this.pageSize.toString());
        if (this.keyword.length > 0) {
            params.set('keyword', this.keyword.toString());
        }
        var sc = this.http.get(this.gs.searchUsersURL, { withCredentials: true, search: params }).subscribe(function (req) {
            if (req.status == 200) {
                var data = req.json();
                _this.pageTotal = data.paging.total;
                _this.users = data.data;
                _this.UIControl();
                _this.refreshPageState();
                sc.unsubscribe();
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    UserListComponent.prototype.batchEnableUser = function () {
        var _this = this;
        var ids = [];
        $("tbody tr").find('td input[type="checkbox"]:eq(0):checked').parent().next().each(function (i, ele) {
            ids.push($(ele).text());
        });
        var sc = this.http.patch(this.gs.updateUsersURL, { 'ids': ids.join(','), 'enabled': true }, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.gs.showingTopFlashMessageSuccess();
            _this.getUsers();
        }, function (err) {
            console.log(err.toString());
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
    };
    UserListComponent.prototype.batchDisableUser = function () {
        var _this = this;
        var ids = [];
        $("tbody tr").find('td input[type="checkbox"]:eq(0):checked').parent().next().each(function (i, ele) {
            ids.push($(ele).text());
        });
        var sc = this.http.patch(this.gs.updateUsersURL, { 'ids': ids.join(','), 'enabled': false }, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.gs.showingTopFlashMessageSuccess();
            _this.getUsers();
        }, function (err) {
            console.log(err.toString());
            _this.gs.showingTopFlashMessageError();
        }, function () {
        });
    };
    UserListComponent.prototype.enableUser = function (id) {
        var _this = this;
        var url = this.gs.enableUserURL + id.toString();
        var sc = this.http.patch(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.getUsers();
        }, function (err) {
            console.log(err.toString());
        }, function () {
        });
    };
    UserListComponent.prototype.disableUser = function (id) {
        var _this = this;
        var url = this.gs.disableUserURL + id.toString();
        var sc = this.http.patch(url, {}, this.gs.jsonHeadersWithCredentials).subscribe(function (req) {
            sc.unsubscribe();
            _this.getUsers();
        }, function (err) {
            console.log(err.toString());
        }, function () {
        });
    };
    UserListComponent.prototype.refresh = function () {
        var params = {};
        params['page'] = this.page.toString();
        params['page_size'] = this.pageSize.toString();
        if (this.keyword.length > 0) {
            params['keyword'] = this.keyword.toString();
        }
        this.gs.navigate('/admin/user/user-list', params);
    };
    ;
    UserListComponent.prototype.changePage = function (thePage) {
        this.page = thePage;
        this.refresh();
    };
    UserListComponent.prototype.changePageSize = function (thePageSize) {
        this.pageSize = thePageSize;
        this.page = 1;
        this.refresh();
    };
    UserListComponent.prototype.refreshPageState = function () {
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
    UserListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-list',
                    templateUrl: './user-list.component.html',
                    styleUrls: ['./user-list.component.css'],
                },] },
    ];
    /** @nocollapse */
    UserListComponent.ctorParameters = [
        { type: Http, },
        { type: GlobalService, },
        { type: ActivatedRoute, },
    ];
    return UserListComponent;
}());
//# sourceMappingURL=user-list.component.js.map