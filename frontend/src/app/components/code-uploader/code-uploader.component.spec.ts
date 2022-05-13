import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeUploaderComponent } from './code-uploader.component';

describe('CodeUploaderComponent', () => {
  let component: CodeUploaderComponent;
  let fixture: ComponentFixture<CodeUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
