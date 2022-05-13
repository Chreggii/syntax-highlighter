import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodePresenterComponent } from './components/code-presenter/code-presenter.component';
import { SafePipe } from './pipes/safe.pipe';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { CodeUploaderComponent } from './components/code-uploader/code-uploader.component';
import { HCodeValuesHandlerComponent } from './components/h-code-values-handler/h-code-values-handler.component';

@NgModule({
  declarations: [AppComponent, CodePresenterComponent, SafePipe, FileUploaderComponent, CodeUploaderComponent, HCodeValuesHandlerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
