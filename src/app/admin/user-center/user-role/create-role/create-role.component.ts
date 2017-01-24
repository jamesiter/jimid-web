import {Component, OnInit, Input, ViewChild, AfterViewChecked, EventEmitter, Output} from '@angular/core';
import {NgForm, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {Role} from "../role";
declare let $: any;

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit, AfterViewChecked {

  public role: Role = new Role();

  private createRoleForm: NgForm;
  @ViewChild("createRoleForm") currentForm: NgForm;

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  show() {
    $('#create_role_modal').modal('show');
  }

  hide() {
    $('#create_role_modal').modal('hide');
  }

  FormChanged() {
    if (this.currentForm === this.createRoleForm) { return; }
    this.createRoleForm = this.currentForm;
    if (this.createRoleForm) {
      this.createRoleForm.valueChanges.subscribe(
        (data) => {
          if (!this.createRoleForm) { return; }
          const form = this.createRoleForm.form;
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
    'remark': ''
  };

  validationMessages = {
    'name': {
      'required': '角色名为必填字段。',
      'minlength': '角色名不得少于5个字符。',
      'maxlength': '角色名不得超30个字符。'
    },
    'remark': {
      'maxlength': '备注长度不得超255个字符。'
    }
  };

  onSubmit() {
    let name = this.role.name;
    let remark = this.role.remark;
    let payload = {name, remark};
    let sc = this.http.post(this.gs.createRoleURL, payload, this.gs.jsonHeadersWithCredentials).subscribe(
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
