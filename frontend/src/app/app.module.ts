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
import { TopNavigationBarComponent } from './components/top-navigation-bar/top-navigation-bar.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageFormalModelComponent } from './components/page-formal-model/page-formal-model.component';
import { PageMlModelComponent } from './components/page-ml-model/page-ml-model.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, CodePresenterComponent, SafePipe, FileUploaderComponent, CodeUploaderComponent, HCodeValuesHandlerComponent, TopNavigationBarComponent, PageHomeComponent, PageFormalModelComponent, PageMlModelComponent, PageAboutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
