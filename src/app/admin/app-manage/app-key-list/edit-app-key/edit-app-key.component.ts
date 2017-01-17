import {Component, OnInit, AfterViewChecked, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {AppKey} from "../app-key";
declare let $: any;


@Component({
  selector: 'app-edit-app-key',
  templateUrl: './edit-app-key.component.html',
  styleUrls: ['./edit-app-key.component.css']
})
export class EditAppKeyComponent implements OnInit, AfterViewChecked {
  public appKey: AppKey = new AppKey();
  private updateAppKeyForm: NgForm;
  @ViewChild("updateAppKeyForm") currentForm: NgForm;
  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(appKey: AppKey) {
    this.appKey= appKey;
    $('#edit_app_key_modal').modal('show');
  }

  hide() {
    $('#edit_app_key_modal').modal('hide');
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  FormChanged() {
    if (this.currentForm === this.updateAppKeyForm) { return; }
    this.updateAppKeyForm = this.currentForm;
    if (this.updateAppKeyForm) {
      this.updateAppKeyForm.valueChanges.subscribe(
        (data) => {
          if (!this.updateAppKeyForm) { return; }
          const form = this.updateAppKeyForm.form;
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
    'name': '',
    'home_page': '',
    'remark': ''
  };

  validationMessages = {
    'name': {
      'required': '应用名称为必填字段。',
      'minlength': '应用名称不得少于1个字符。',
      'maxlength': '应用名称不得超40个字符。'
    },
    'home_page': {
      'required': '应用入口为必填字段。',
      'minlength': '应用入口不得少于1个字符。',
      'maxlength': '应用入口不得超40个字符。'
    },
    'remark': {
      'required': '备注为必填字段。',
      'minlength': '备注不得少于1个字符。',
      'maxlength': '备注不得超40个字符。'
    }
  };

  onSubmit() {
    let id = this.appKey.id;
    let name = this.appKey.name;
    let home_page = this.appKey.home_page;
    let remark = this.appKey.remark;

    let payload = {id, name, home_page, remark};

    let sc = this.http.patch(this.gs.updateAppKeyURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(
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

