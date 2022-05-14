import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFormalModelComponent } from './components/page-formal-model/page-formal-model.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageMlModelComponent } from './components/page-ml-model/page-ml-model.component';
import { PageAboutComponent } from './components/page-about/page-about.component';

const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'formal-model', component: PageFormalModelComponent },
  { path: 'ml-model', component: PageMlModelComponent },
  { path: 'about', component: PageAboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
