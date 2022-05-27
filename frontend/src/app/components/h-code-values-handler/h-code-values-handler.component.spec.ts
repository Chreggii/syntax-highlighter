import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCodeValuesHandlerComponent } from './h-code-values-handler.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";

describe('HCodeValuesHandlerComponent', () => {
  let component: HCodeValuesHandlerComponent;
  let fixture: ComponentFixture<HCodeValuesHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HCodeValuesHandlerComponent],
      providers: [HttpClient, HttpHandler, FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HCodeValuesHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
