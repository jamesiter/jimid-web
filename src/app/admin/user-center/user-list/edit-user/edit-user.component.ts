import {Component, OnInit, AfterViewChecked, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import {User} from "../user";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, AfterViewChecked {

  public user: User = new User();

  private updateUserForm: NgForm;
  @ViewChild("updateUserForm") currentForm: NgForm;

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(user: User) {
    this.user = user;
    $('#edit_user_modal').modal('show');
  }

  hide() {
    $('#edit_user_modal').modal('hide');
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  FormChanged() {
    if (this.currentForm === this.updateUserForm) { return; }
    this.updateUserForm = this.currentForm;
    if (this.updateUserForm) {
      this.updateUserForm.valueChanges.subscribe(
        (data) => {
          if (!this.updateUserForm) { return; }
          const form = this.updateUserForm.form;
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
    let payload = {};
    if (this.user.login_name.length > 0) {
      payload['login_name'] = this.user.login_name;
    }

    if (this.user.mobile_phone.length == 11) {
      payload['mobile_phone'] = this.user.mobile_phone;
      payload['mobile_phone_verified'] = true;
    } else {
      payload['mobile_phone_verified'] = false;
    }

    if (this.user.email.length > 0) {
      payload['email'] = this.user.email;
      payload['email_verified'] = true;
    } else {
      payload['email_verified'] = false;
    }

    let url = this.gs.updateUserURL + this.user.id;

    let sc = this.http.patch(url, payload, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
        this.gs.showingTopFlashMessageSuccess();
      },
      (err) => {
        console.log(err);
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );

    this.currentForm.reset();
    this.hide();
  }
}
