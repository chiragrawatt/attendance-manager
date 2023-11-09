import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/shared/models/interfaces/Student';
import { StudentService } from 'src/shared/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})

export class AddStudentComponent {
  isLoading : boolean = false;
  formData = {
    title: "Student",
    subtitle: "Enter details of the student",
    isUpdate: false,
    student: null,
    buttonText: "ADD"
  }

  constructor(private studentService : StudentService, private router: Router) {}

  saveStudent(student: IStudent) : void {
    this.isLoading = true;
    this.studentService.addStudent(student).subscribe({
      next: res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}