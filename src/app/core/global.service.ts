import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from "@angular/http";

@Injectable()
export class GlobalService {


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
  // 删除单个用户信息
  public deleteUserURL = this.APIBaseURL + '/mgmt/';
  // 更新指定用户密码
  public resetPasswordURL = this.APIBaseURL + '/mgmt/_change_password';

  // 获取AppKey
  public searchAppKeysURL = this.APIBaseURL + '/app_keys/_search';
  // 创建AppKey
  public createAppKeyURL = this.APIBaseURL + '/app_key';
  // 删除AppKey
  public deleteAppKeyURL = this.APIBaseURL + '/app_key/';

  public topFlashMessage = '';
  public topFlashMessageType = 'loading';
  public topFlashSuccessMessage = '操作已经成功完成';
  public topFlashLoadingMessage = '正在努力加载中';
  public topFlashErrorMessage = '操作失败';
  public timer: number = 10;
  public topFlashMessageDuration = 3;

  constructor() {
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
}
