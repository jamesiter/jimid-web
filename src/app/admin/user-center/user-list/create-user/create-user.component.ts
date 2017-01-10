import {Component, OnInit, Input, ViewChild, AfterViewChecked, EventEmitter, Output} from '@angular/core';
import {User} from "../user";
import {NgForm, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, AfterViewChecked {

  public user: User = new User();

  private signUpForm: NgForm;
  @ViewChild("signUpForm") currentForm: NgForm;

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  show() {
    $('#create_user_modal').modal('show');
  }

  hide() {
    $('#create_user_modal').modal('hide');
  }

  FormChanged() {
    if (this.currentForm === this.signUpForm) { return; }
    this.signUpForm = this.currentForm;
    if (this.signUpForm) {
      this.signUpForm.valueChanges.subscribe(
        (data) => {
          if (!this.signUpForm) { return; }
          const form = this.signUpForm.form;
          this.onValueChanged(form, data);
        }
      );
    }
  }

  onValueChanged(form: FormGroup, data?: any) {
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
    let login_name = this.user.login_name;
    let password = this.user.password;
    let mobile_phone = this.user.mobile_phone;
    let email = this.user.email;
    let payload = {login_name, password};
    let sc = this.http.post(this.gs.signUpURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(
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
          let sc = this.http.patch(this.gs.updateUserURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(
            (req) => {
              sc.unsubscribe();
              this.completed.emit();
              this.gs.showingTopFlashMessageLoading();
            },
            (err) => {
              console.log(err.toString());
              this.gs.showingTopFlashMessageError();
            },
            () => {
            }
          );
        } else {
          this.completed.emit();
          this.gs.showingTopFlashMessageLoading();
        }
        this.currentForm.reset();
        this.hide();
      },
      (err) => {
        console.log(err.toString());
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
  }
}
