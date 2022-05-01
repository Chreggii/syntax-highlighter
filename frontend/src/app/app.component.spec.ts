import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { getBaseUrl } from './functions/url-resolver.function';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();

    const injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should send request with empty fields', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.sendRequest();
    const req = httpMock.expectOne(
      `${getBaseUrl()}/file-highlighter?sourceText=null&language=null`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should not send request when no file found', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onFileSelected({ target: { files: [] } });
    httpMock.expectNone(
      `${getBaseUrl()}/file-highlighter?sourceText=null&language=null`
    );
  });
});
