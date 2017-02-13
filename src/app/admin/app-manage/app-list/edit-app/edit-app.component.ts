import {Component, OnInit, AfterViewChecked, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {App} from "../app";
declare let $: any;


@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent implements OnInit, AfterViewChecked {
  public app: App = new App();
  private updateAppForm: NgForm;
  @ViewChild("updateAppForm") currentForm: NgForm;
  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(app: App) {
    this.app= app;
    $('#edit_app_modal').modal('show');
  }

  hide() {
    $('#edit_app_modal').modal('hide');
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  FormChanged() {
    if (this.currentForm === this.updateAppForm) { return; }
    this.updateAppForm = this.currentForm;
    if (this.updateAppForm) {
      this.updateAppForm.valueChanges.subscribe(
        (data) => {
          if (!this.updateAppForm) { return; }
          const form = this.updateAppForm.form;
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
    let name = this.app.name;
    let home_page = this.app.home_page;
    let remark = this.app.remark;

    let payload = { name, home_page, remark};

    let url = this.gs.updateAppURL + this.app.id;

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

