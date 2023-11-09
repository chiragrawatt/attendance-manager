import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAttendance } from 'src/shared/models/interfaces/Attendance';
import { IStudent } from 'src/shared/models/interfaces/Student';
import { StudentService } from 'src/shared/services/student.service';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent {
  @ViewChild('rollNoInput') rollNoInput!: ElementRef<HTMLInputElement>;
  attendanceForm: FormGroup = this.fb.group({});
  students: IStudent[] | null = null;
  filteredOptions: IStudent[] | undefined;

  constructor(private fb: FormBuilder, private studentService: StudentService) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      rollNo: ['', [Validators.required]],
      date: ['', [Validators.required]],
      status: ['present', [Validators.required]]
    })

    this.studentService.students.subscribe({
      next: res => {
        this.students = res;
      },
      error: err => {
        console.log(err);
      }
    })

  }

  onSubmit() {
    let formData = this.attendanceForm.getRawValue();
    this.studentService.markAttendance(formData.rollNo, {date: formData.date, status: formData.status}).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  filter(): void {
    const filterValue = this.rollNoInput.nativeElement.value.toLowerCase();
    this.filteredOptions = this.students?.filter(student => student.rollNo.toLowerCase().includes(filterValue));
  }
}
