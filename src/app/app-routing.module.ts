import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { MarkAttendanceComponent } from './content/mark-attendance/mark-attendance.component';
import { ChartComponent } from './content/chart/chart.component';
import { AddStudentComponent } from './content/student/add-student/add-student.component';
import { EditStudentComponent } from './content/student/edit-student/edit-student.component';
import { ViewAttendanceComponent } from './content/student/view-attendance/view-attendance.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "attendance",
    component: MarkAttendanceComponent
  },
  {
    path: "student",
    children: [
      {
        path: "add",
        component: AddStudentComponent
      },
      {
        path: "edit/:id",
        component: EditStudentComponent
      },
      {
        path: "attendance/:id",
        component: ViewAttendanceComponent
      }
    ]
  },
  {
    path: "chart",
    component: ChartComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
