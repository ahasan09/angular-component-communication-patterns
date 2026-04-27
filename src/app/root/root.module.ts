import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootDefaultComponent } from './root-default/root-default.component';
import { StudentComponent } from '../student/student.component';
import { CoursesComponent } from '../courses/courses.component';
import { appRoutes } from './routes';
import { NotFoundComponent } from './not-found.component';
import { HomeComponent } from '../home/home.component';

@NgModule({
  declarations: [
    RootDefaultComponent,
    StudentComponent,
    CoursesComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [RootDefaultComponent]
})
export class RootModule {}
