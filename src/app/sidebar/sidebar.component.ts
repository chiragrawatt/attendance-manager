import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  navData = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "Mark Attendance",
      path: "/attendance",
      icon: "collections_bookmark"
    },{
      title: "Add Student",
      path: "/student/add",
      icon: "person_add"
    },{
      title: "Chart",
      path: "/chart",
      icon: "insert_chart"
    }
  ]
}
