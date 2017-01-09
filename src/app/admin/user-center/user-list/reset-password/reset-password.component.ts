import {Component, OnInit, ViewChild, Output, EventEmitter, AfterViewChecked} from '@angular/core';

import any = jasmine.any;
import {User} from "../user";
import {NgForm, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";
declare let $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewChecked {

  public user: User = new User();

  private resetPasswordForm: NgForm;
  @ViewChild("resetPasswordForm") currentForm: NgForm;

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(user: User) {
    this.user = user;
    $('#reset_password_modal').modal('show');
  }

  hide() {
    $('#reset_password_modal').modal('hide');
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  FormChanged() {
    if (this.currentForm === this.resetPasswordForm) { return; }
    this.resetPasswordForm = this.currentForm;
    if (this.resetPasswordForm) {
      this.resetPasswordForm.valueChanges.subscribe(
        (data) => {
          if (!this.resetPasswordForm) { return; }
          const form = this.resetPasswordForm.form;
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
    'password': ''
  };

  validationMessages = {
    'password': {
      'required': '密码为必填字段。',
      'minlength': '密码长度不得少于6个字符。',
      'maxlength': '密码长度不得超100个字符。'
    }
  };

  onSubmit() {
    let id = this.user.id;
    let password = this.user.password;

    let payload = {id, password};

    let sc = this.http.patch(this.gs.resetPasswordURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
      },
      (err) => {
        console.log(err);
      },
      () => {
      }
    );

    this.currentForm.reset();
    this.hide();
  }
}
