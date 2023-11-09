import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from 'src/shared/models/interfaces/Student';
import { StudentService } from 'src/shared/services/student.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit{
  student: IStudent | null = null;
  studentId: string | null = null;

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.studentService.student.subscribe({
      next: res => {
        this.student = res;
      },
      error: err => {
        console.log(err);
      }
    })

    this.route.paramMap.subscribe({
      next: param => {
        this.studentId = param.get('id');
        if (this.studentId != null) {
          this.studentService.fetchStudentById(this.studentId);
        }
      },
      error: err => console.log(err)
    })
  }
}
