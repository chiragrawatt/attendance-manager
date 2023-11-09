import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/shared/models/interfaces/Student';
import { StudentService } from 'src/shared/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  student: IStudent | null = null;
  studentId: string | null = null;

  formData = {
    title: "Student",
    subtitle: "Enter details of the student",
    isUpdate: true,
    student: this.student,
    buttonText: "UPDATE"
  }

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.studentService.student.subscribe({
      next: res => {
        this.student = res;
        this.formData.student = this.student;
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

  updateStudent(student: IStudent): void {
      this.studentService.updateStudent(student).subscribe({
        next: res => {
          console.log(res);
          this.router.navigateByUrl('/dashboard');
        },
        error: err => console.log(err)
      });
  }
}
