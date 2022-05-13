import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMlModelComponent } from './page-ml-model.component';

describe('PageMlModelComponent', () => {
  let component: PageMlModelComponent;
  let fixture: ComponentFixture<PageMlModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMlModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMlModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
