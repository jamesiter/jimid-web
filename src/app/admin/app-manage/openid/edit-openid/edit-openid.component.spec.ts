/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditOpenidComponent } from './edit-openid.component';

describe('EditOpenidComponent', () => {
  let component: EditOpenidComponent;
  let fixture: ComponentFixture<EditOpenidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOpenidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOpenidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
