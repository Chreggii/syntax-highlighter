import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormalModelComponent } from './page-formal-model.component';

describe('PageFormalModelComponent', () => {
  let component: PageFormalModelComponent;
  let fixture: ComponentFixture<PageFormalModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageFormalModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFormalModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
