import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {


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

  constructor() { }

}
