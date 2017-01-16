import {Component, OnInit, AfterViewChecked, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {Openid} from "../openid";
import {User} from "../../../user-center/user-list/user";
import {AppKey} from "../../app-key-list/app-key";
declare let $: any;

@Component({
  selector: 'app-edit-openid',
  templateUrl: './edit-openid.component.html',
  styleUrls: ['./edit-openid.component.css']
})
export class EditOpenidComponent implements OnInit, AfterViewChecked {
  public openid: Openid = new Openid();
  private updateOpenidForm: NgForm;
  @ViewChild("updateOpenidForm") currentForm: NgForm;
  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
    this.openid.user = new User();
    this.openid.app_key = new AppKey();
  }

  ngOnInit() {
  }

  show(openid: Openid) {
    this.openid = openid;
    $('#edit_openid_modal').modal('show');
  }

  hide() {
    $('#edit_openid_modal').modal('hide');
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  FormChanged() {
    if (this.currentForm === this.updateOpenidForm) { return; }
    this.updateOpenidForm = this.currentForm;
    if (this.updateOpenidForm) {
      this.updateOpenidForm.valueChanges.subscribe(
        (data) => {
          if (!this.updateOpenidForm) { return; }
          const form = this.updateOpenidForm.form;
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
    'openid': ''
  };

  validationMessages = {
    'openid': {
      'required': 'OpenID为必填字段。',
      'minlength': 'OpenID不得少于1个字符。',
      'maxlength': 'OpenID不得超40个字符。'
    }
  };

  onSubmit() {
    let uid = this.openid.uid;
    let appid = this.openid.appid;
    let openid = this.openid.openid;

    let payload = {uid, appid, openid};

    let sc = this.http.patch(this.gs.updateOpenidURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(
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
