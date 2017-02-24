import {Component, OnInit, AfterViewChecked, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import {Http} from "@angular/http";
import {GlobalService} from "../../../../core/global.service";

import any = jasmine.any;
import {Role} from "../role";
declare let $: any;

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit, AfterViewChecked {

  public role: Role = new Role();

  public updateRoleForm: NgForm;
  @ViewChild("updateRoleForm") currentForm: NgForm;

  @Output() completed = new EventEmitter();

  constructor(private http: Http, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  show(role: Role) {
    this.role = role;
    $('#edit_role_modal').modal('show');
  }

  hide() {
    $('#edit_role_modal').modal('hide');
  }

  ngAfterViewChecked() {
    this.FormChanged();
  }

  FormChanged() {
    if (this.currentForm === this.updateRoleForm) { return; }
    this.updateRoleForm = this.currentForm;
    if (this.updateRoleForm) {
      this.updateRoleForm.valueChanges.subscribe(
        (data) => {
          if (!this.updateRoleForm) { return; }
          const form = this.updateRoleForm.form;
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
    let payload = {};

    if (this.role.name.length > 0) {
      payload['name'] = this.role.name;
    }

    payload['remark'] = this.role.remark;

    let url = this.gs.updateRoleURL + this.role.id.toString();

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
