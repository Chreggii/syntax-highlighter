import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { CodeUploaderComponent } from './code-uploader.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { getBaseUrl } from '../../functions/url-resolver.function';

describe('CodeUploaderComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [AppComponent, CodeUploaderComponent],
    }).compileComponents();

    const injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CodeUploaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should send request with empty fields', () => {
    const fixture = TestBed.createComponent(CodeUploaderComponent);
    const app = fixture.componentInstance;
    app.sendRequest();
    const req = httpMock.expectOne(`${getBaseUrl()}/highlight-text`);
    expect(req.request.method).toBe('POST');
  });

  it('should not send request when no file found', () => {
    const fixture = TestBed.createComponent(CodeUploaderComponent);
    const app = fixture.componentInstance;
    app.onFileSelected({ target: { files: [] } });
    httpMock.expectNone(`${getBaseUrl()}/highlight-file`);
  });
});
