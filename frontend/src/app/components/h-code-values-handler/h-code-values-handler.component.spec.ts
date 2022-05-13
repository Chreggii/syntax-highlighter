import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCodeValuesHandlerComponent } from './h-code-values-handler.component';

describe('HCodeValuesHandlerComponent', () => {
  let component: HCodeValuesHandlerComponent;
  let fixture: ComponentFixture<HCodeValuesHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HCodeValuesHandlerComponent ]
    })
    .compileComponents();
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
