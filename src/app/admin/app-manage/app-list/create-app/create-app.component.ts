import {Component, OnInit, ViewChild, Output, EventEmitter, AfterViewChecked} from '@angular/core';
import {App} from "../app";
import {NgForm, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
declare let $: any;

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent implements OnInit, AfterViewChecked {

  public app: App = new App();

  private createAppForm: NgForm;
  @ViewChild("createAppForm") currentForm: NgForm;

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  show() {
    $('#create_app_modal').modal('show');
  }

  hide() {
    $('#create_app_modal').modal('hide');
  }

  FormChanged() {
    if (this.currentForm === this.createAppForm) { return; }
    this.createAppForm = this.currentForm;
    if (this.createAppForm) {
      this.createAppForm.valueChanges.subscribe(
        (data) => {
          if (!this.createAppForm) { return; }
          const form = this.createAppForm.form;
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
    'name': ''
  };

  validationMessages = {
    'name': {
      'required': '应用名目为必填字段。',
      'minlength': '应用名称不得少于2个字符。',
      'maxlength': '应用名称不得超30个字符。'
    }
  };

  onSubmit() {
    let name = this.app.name;
    let home_page = this.app.home_page;
    let remark = this.app.remark;

    let payload = {name, home_page, remark};
    let sc = this.http.post(this.gs.createAppURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(
      (req) => {
        sc.unsubscribe();
        this.completed.emit();
        this.gs.showingTopFlashMessageSuccess();
      },
      (err) => {
        console.log(err.toString());
        this.gs.showingTopFlashMessageError();
      },
      () => {
      }
    );
    this.currentForm.reset();
    this.hide();
  }
}
