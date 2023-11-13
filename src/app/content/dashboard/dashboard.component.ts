import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DISPLAYED_COLUMNS } from 'src/shared/constants/data.constants';
import { IStudent } from 'src/shared/models/interfaces/Student';
import { StudentService } from 'src/shared/services/student.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  dataSource: MatTableDataSource<IStudent> = new MatTableDataSource<IStudent>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.studentService.students.subscribe((data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }))

    this.studentService.fetchAllStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  navigateToViewAttendance(studentId: String) {
    this.router.navigateByUrl(`/student/attendance/${studentId}`);
  }

  navigateToEditStudent(studentId: String) {
    this.router.navigateByUrl(`/student/edit/${studentId}`);
  }

  deleteStudent(studentId: string) {
    this.isLoading = true;
    this.studentService.deleteStudent(studentId).subscribe({
      next: res => {
        console.log(res);
        this.isLoading = false;
        this.studentService.fetchAllStudents();
      },
      error: err => {
        this.isLoading = false;
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
1