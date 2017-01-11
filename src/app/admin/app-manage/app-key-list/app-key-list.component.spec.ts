/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppKeyListComponent } from './app-key-list.component';

describe('AppKeyListComponent', () => {
  let component: AppKeyListComponent;
  let fixture: ComponentFixture<AppKeyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppKeyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppKeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
