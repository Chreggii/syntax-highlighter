import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodePresenterComponent } from './components/code-presenter/code-presenter.component';
import { SafePipe } from './pipes/safe.pipe';
import { CodeUploaderComponent } from './components/code-uploader/code-uploader.component';
import { TopNavigationBarComponent } from './components/top-navigation-bar/top-navigation-bar.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageFormalModelComponent } from './components/page-formal-model/page-formal-model.component';
import { PageMlModelComponent } from './components/page-ml-model/page-ml-model.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    CodePresenterComponent,
    SafePipe,
    CodeUploaderComponent,
    TopNavigationBarComponent,
    PageHomeComponent,
    PageFormalModelComponent,
    PageMlModelComponent,
    PageAboutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
