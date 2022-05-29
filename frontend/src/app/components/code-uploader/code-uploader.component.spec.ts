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
import {HighlightService} from "../../services/highlighter/highlight.service";

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

  it('should send text request with empty fields', () => {
    const fixture = TestBed.createComponent(CodeUploaderComponent);
    const app = fixture.componentInstance;
    app.sendTextRequest();
    const req = httpMock.expectOne(`${getBaseUrl()}/highlight-text`);
    expect(req.request.method).toBe('POST');
  });

  it('should not send file request when no file found', () => {
    const fixture = TestBed.createComponent(CodeUploaderComponent);
    const app = fixture.componentInstance;
    const file = app.uploadFile({ target: { files: [] } });
    app.sendFileRequest(file, 'darcula');
    httpMock.expectNone(`${getBaseUrl()}/highlight-file`);
  });

  it('should send Text request without html', () => {
    const fixture = TestBed.createComponent(CodeUploaderComponent);
    const app = fixture.componentInstance;
    app.formText.get('returnHtml')?.setValue('no');
    app.formText.get('sourceText')?.setValue('print(\'hello\')');
    app.formText.get('language')?.setValue('python');
    app.formText.get('mode')?.setValue('classic');
    app.sendTextRequest();
    const req = httpMock.expectOne(`${getBaseUrl()}/highlight-text`);
    expect(req.request.method).toBe('POST');
  });

  it('should send Text request with html', () => {
    const fixture = TestBed.createComponent(CodeUploaderComponent);
    const app = fixture.componentInstance;
    app.formText.get('returnHtml')?.setValue('yes');
    app.formText.get('sourceText')?.setValue('print(\'hello\')');
    app.formText.get('language')?.setValue('python');
    app.formText.get('mode')?.setValue('classic');
    app.sendTextRequest();
    const req = httpMock.expectOne(`${getBaseUrl()}/highlight-text-html`);
    expect(req.request.method).toBe('POST');
  });
});
