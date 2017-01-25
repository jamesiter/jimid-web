import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import {Router, Params} from "@angular/router";
import {Observer} from "rxjs";

@Injectable()
export class GlobalService {

  public roleObserver: Observer<number>;
  public current_user: any = {};

  public jsonHeaders = new Headers({ 'Content-Type': 'application/json' });
  public jsonHeadersWithCredentials = new RequestOptions({ headers: this.jsonHeaders, withCredentials: true });

  public http = 'http://';
  public https = 'https://';
  public domain  = 'dev.iit.im';
  public hostName = 'jimauth';
  public fqdn = this.hostName + '.' + this.domain;
  public httpURL= this.http + this.fqdn;
  public httpsURL= this.https + this.fqdn;

  public baseURL = this.httpURL;

  public APIBaseURL = this.baseURL + '/api';
  public authURL = this.APIBaseURL + '/user/_auth';
  public signUpURL = this.APIBaseURL + '/user/_sign_up';
  public signInURL = this.APIBaseURL + '/user/_sign_in';
  public signInByMobilePhoneURL = this.APIBaseURL + '/user/_sign_in_by_mobile_phone';
  public signInByEMailURL = this.APIBaseURL + '/user/_sign_in_by_email';
  public signOutURL = this.APIBaseURL + '/user/_sign_out';
  // 获取用户所拥有的应用列表
  public getSelfAppListURL = this.APIBaseURL + '/user/_app_list';

  // 获取用户自己的用户信息
  public getSelfInfoURL = this.APIBaseURL + '/user';
  public searchUsersURL = this.APIBaseURL + '/mgmts/_search';
  // 更新单个用户信息
  public updateUserURL = this.APIBaseURL + '/mgmt';
  // 批量更新用户信息
  public updateUsersURL = this.APIBaseURL + '/mgmts';
  // 激活指定用户
  public enableUserURL = this.APIBaseURL + '/mgmt/_enable/';
  // 禁用指定用户
  public disableUserURL = this.APIBaseURL + '/mgmt/_disable/';
  // 获取单个用户信息
  public getUserURL = this.APIBaseURL + '/mgmt/';
  // 通过过滤获取相关用户信息
  public getUsersURL = this.APIBaseURL + '/mgmts';
  // 删除单个用户信息
  public deleteUserURL = this.APIBaseURL + '/mgmt/';
  // 更新指定用户密码
  public resetPasswordURL = this.APIBaseURL + '/mgmt/_change_password';

  // 获取AppKey
  public searchAppKeysURL = this.APIBaseURL + '/app_keys/_search';
  // 创建AppKey
  public createAppKeyURL = this.APIBaseURL + '/app_key';
  // 更新AppKey
  public updateAppKeyURL = this.APIBaseURL + '/app_key';
  // 删除AppKey
  public deleteAppKeyURL = this.APIBaseURL + '/app_key/';

  public searchOpenidsURL = this.APIBaseURL + '/openids_admin/_search';
  public updateOpenidURL = this.APIBaseURL + '/openid_admin';
  public deleteOpenidURL = this.APIBaseURL + '/openid_admin/';

  // 获取角色及用户和应用的映射
  public getRolesURL = this.APIBaseURL + '/roles';
  // 创建角色
  public createRoleURL = this.APIBaseURL + '/role';
  // 更新角色
  public updateRoleURL = this.APIBaseURL + '/role/';
  // 删除角色
  public deleteRoleURL = this.APIBaseURL + '/role/';
  // 添加用户成员到角色
  public addMemberToRoleURL = this.APIBaseURL + '/role/_add_user_to_role/';
  // 从角色删除用户成员
  public deleteMemberFromRoleURL = this.APIBaseURL + '/role/_delete_user_from_role/';
  // 添加应用到角色
  public addAppToRoleURL = this.APIBaseURL + '/role/_add_app_to_role/';
  // 从角色删除应用
  public deleteAppFromRoleURL = this.APIBaseURL + '/role/_delete_app_from_role/';
  // 从不属于任何角色的用户中模糊查找
  public searchRoleFreeUsersURL = this.APIBaseURL + '/roles/_search_with_free_users';

  public topFlashMessage = '';
  public topFlashMessageType = 'success';
  public topFlashSuccessMessage = '操作已经成功完成';
  public topFlashLoadingMessage = '正在努力加载中';
  public topFlashErrorMessage = '操作失败';
  public timer: number = 10;
  public topFlashMessageDuration = 3;

  constructor(private _http: Http, private router: Router) {
    this.timerRun();
  }

  timerRun() {
    setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        }
      },
      1000
    );
  }

  public showingTopFlashMessage(message: string, type: string, time: number) {
    this.topFlashMessage = message;
    this.topFlashMessageType = type;
    this.timer = time;
  }

  public showingTopFlashMessageSuccess(message: string = this.topFlashSuccessMessage) {
    this.showingTopFlashMessage(message, 'success', this.topFlashMessageDuration);
  }

  public showingTopFlashMessageLoading(message: string = this.topFlashSuccessMessage) {
    this.showingTopFlashMessage(message, 'loading', this.topFlashMessageDuration);
  }

  public showingTopFlashMessageError(message: string = this.topFlashErrorMessage) {
    this.showingTopFlashMessage(message, 'error', this.topFlashMessageDuration);
  }

  getSelfInfo() {
    let sc = this._http.get(this.getSelfInfoURL, this.jsonHeadersWithCredentials).subscribe(
      (req) => {
        if (req.status == 200) {
          console.log('Get self info succeed!');
          this.current_user = req.json().data || {};
          this.roleObserver.next(this.current_user.manager);
        }
        sc.unsubscribe();
      },
      (err) => {
        console.log('Get self info failed!');
        console.log(err.toString());
      },
      () => {
        console.log('Get self info complete!');
      }
    );
  }

  navigate(url, queryParams: Params = {}) {
    this.router.navigate([url], {queryParams: queryParams});
  }
}
