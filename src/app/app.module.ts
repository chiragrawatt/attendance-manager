import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { MarkAttendanceComponent } from './content/mark-attendance/mark-attendance.component';
import { StudentComponent } from './content/student/student.component';
import { AddStudentComponent } from './content/student/add-student/add-student.component';
import { EditStudentComponent } from './content/student/edit-student/edit-student.component';
import { ViewAttendanceComponent } from './content/student/view-attendance/view-attendance.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    DashboardComponent,
    MarkAttendanceComponent,
    StudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    ViewAttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
