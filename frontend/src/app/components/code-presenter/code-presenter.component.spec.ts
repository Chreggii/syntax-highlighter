/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePipe } from '../../pipes/safe.pipe';
import { CodePresenterComponent } from './code-presenter.component';

describe('CodePresenterComponent', () => {
  let component: CodePresenterComponent;
  let fixture: ComponentFixture<CodePresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodePresenterComponent, SafePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
